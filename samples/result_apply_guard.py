"""公開用サンプル: AIが返した変更結果を安全に適用するための最小実装。

実プロジェクトの Result Apply 実装から、
- 対象Headの一致確認
- 変更対象の許可リスト
- 結果不明時の再実行防止
- 外部状態の再取得による確定
を抜き出して単純化しています。
"""

from __future__ import annotations

from dataclasses import dataclass, replace
from enum import Enum


class ResultApplyError(RuntimeError):
    pass


class ApplyState(str, Enum):
    PREPARED = "PREPARED"
    DISPATCHED = "DISPATCHED"
    OUTCOME_UNKNOWN = "OUTCOME_UNKNOWN"
    APPLIED = "APPLIED"
    NOT_APPLIED = "NOT_APPLIED"


@dataclass(frozen=True)
class ApplyPlan:
    expected_head: str
    changed_paths: tuple[str, ...]
    allowed_paths: frozenset[str]


@dataclass(frozen=True)
class ApplyAttempt:
    attempt_id: str
    state: ApplyState
    reason: str = ""


def validate_plan(plan: ApplyPlan, observed_head: str) -> None:
    """適用直前のGit状態と変更範囲を検証する。"""
    if observed_head != plan.expected_head:
        raise ResultApplyError("対象ブランチが更新されているため適用を停止します")

    escaped = set(plan.changed_paths) - set(plan.allowed_paths)
    if escaped:
        raise ResultApplyError(f"許可されていない変更対象です: {sorted(escaped)}")


class ApplyLedger:
    """AI結果の適用状態を保持し、危険な再実行を防ぐ。"""

    def __init__(self) -> None:
        self.current: ApplyAttempt | None = None

    def prepare(self, attempt_id: str) -> ApplyAttempt:
        if self.current is not None:
            if self.current.state == ApplyState.APPLIED:
                raise ResultApplyError("すでに適用済みです")
            if self.current.state == ApplyState.OUTCOME_UNKNOWN:
                raise ResultApplyError(
                    "結果不明のため、GitHubの実状態を確認するまで再実行できません"
                )
            if self.current.state in {ApplyState.PREPARED, ApplyState.DISPATCHED}:
                raise ResultApplyError("別の適用処理が進行中です")

        self.current = ApplyAttempt(attempt_id=attempt_id, state=ApplyState.PREPARED)
        return self.current

    def mark_dispatched(self, attempt: ApplyAttempt) -> ApplyAttempt:
        self._assert_current(attempt)
        if attempt.state != ApplyState.PREPARED:
            raise ResultApplyError("不正な状態遷移です")

        self.current = replace(attempt, state=ApplyState.DISPATCHED)
        return self.current

    def mark_outcome_unknown(self, attempt: ApplyAttempt, reason: str) -> ApplyAttempt:
        self._assert_current(attempt)
        if attempt.state != ApplyState.DISPATCHED:
            raise ResultApplyError("不正な状態遷移です")

        self.current = replace(
            attempt,
            state=ApplyState.OUTCOME_UNKNOWN,
            reason=reason,
        )
        return self.current

    def reconcile(
        self,
        attempt: ApplyAttempt,
        *,
        expected_head: str,
        observed_head: str,
        applied_commit_parent: str | None,
    ) -> ApplyAttempt:
        """GitHubの実状態を再取得して、適用結果を確定する。"""
        self._assert_current(attempt)
        if attempt.state not in {ApplyState.DISPATCHED, ApplyState.OUTCOME_UNKNOWN}:
            raise ResultApplyError("この状態では結果を確定できません")

        if observed_head == expected_head:
            final_state = ApplyState.NOT_APPLIED
        elif applied_commit_parent == expected_head:
            final_state = ApplyState.APPLIED
        else:
            raise ResultApplyError("取得したGit状態を安全に結果へ結び付けられません")

        self.current = replace(
            attempt,
            state=final_state,
            reason=f"GitHubの実状態から {final_state.value} と判定",
        )
        return self.current

    def _assert_current(self, attempt: ApplyAttempt) -> None:
        if self.current != attempt:
            raise ResultApplyError("現在の適用試行ではありません")
