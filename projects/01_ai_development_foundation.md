# AI Development Foundation / Review-Handoff Platform

**Status:** Core integrity / result-application contracts — **IMPLEMENTED**  
**Live dispatch:** **PARTIAL / intentionally constrained**

## What this project is

AI/Coding Agentへ開発を委譲するときに、**「AIが完了と言った」ことではなく、実際のRepository・Revision・CI・変更範囲を確認して受入する**ための共通基盤です。

```text
Goal / Requirement
      ↓
Plan / Gate
      ↓
Coding Agent
      ↓
Test / Review
      ↓
Readback
      ↓
Accept / Reject / Recover
      ↓
Handoff / Learning
```

## Capabilities demonstrated

| Capability | Depth / Status |
|---|---|
| AI Delivery Control | ● IMPLEMENTED |
| State / Gate / Authority | ● IMPLEMENTED |
| Evaluation / Acceptance | ● IMPLEMENTED |
| Independent Review | ● IMPLEMENTED |
| Recovery / Retry | ● IMPLEMENTED |
| Evidence / Readback | ● IMPLEMENTED |
| Agent Orchestration | ● PARTIAL |
| Dynamic Routing | △ DESIGN |

## Problem

AI-assisted developmentでは、コード生成以外に次の問題が起きます。

- 実行途中で止まり、どこまで完了したか分からない
- AIが成功と返してもGitHub上の実状態と一致しない
- 古いRevisionへのReviewを現在の結果として扱ってしまう
- 書き込み結果不明のまま再実行して二重変更する
- 許可していない範囲まで変更が広がる

## Key decisions

### External state is authority
AI / CI / Reviewerの自己申告だけで終了状態を確定しません。Repositoryや対象Revisionなどの実状態をReadbackして判断します。

### Unknown is a real state
結果不明を成功・失敗へ丸めず、確認できるまでBlind retryを止めます。

### Scope is bound before execution
対象Repository / Task / Revision /変更可能範囲を先に固定し、古い結果や範囲外変更を拒否します。

### Dispatch authority is separated
RHP自身はCodexやGitHubへの無制限なLive dispatch権限を持ちません。現在の実装ではDry-run / coordinator境界を明示しています。

## Evidence

- Review安全性のTest
- stale Head / allowlist escape / illegal state transitionの拒否
- OUTCOME_UNKNOWNからのBlind retry防止
- GitHub Result Readback
- Ubuntu / Windowsでの検証
- Billing / Usage readbackが安全条件を証明できない場合のfail-closed

## My responsibility

- 問題定義
- Requirement / State model / Authority boundary設計
- Coding Agentへの実装委譲
- Test / Regression観点の設計
- Diff / CI / Readback確認
- Findingの分析
- Acceptance / Reject / Redesign判断

直接のコード生成は主にCoding Agentを利用しています。

## Connections

- **Signal Harvester / ICP** — Evidence / Provenance / replayの考え方を共有
- **FX Intelligence / TPI** — Evidenceで受入し、評価汚染を防ぐ考え方へ接続
- **FormPilot** — State / Gate / Recovery / External Action境界へ適用
- **Akashic Record** — 将来の複数AI orchestration / evaluation基盤へ接続

## Current gaps

- Repository単体ではLive Codex dispatchを所有しない
- 本格的なMulti-Agent competition / debateは未実装
- Dynamic model routingはDesign段階
