import unittest

from result_apply_guard import (
    ApplyLedger,
    ApplyPlan,
    ApplyState,
    ResultApplyError,
    validate_plan,
)


class ResultApplyGuardTests(unittest.TestCase):
    def test_stale_head_is_rejected(self) -> None:
        plan = ApplyPlan(
            expected_head="a" * 40,
            changed_paths=("src/app.py",),
            allowed_paths=frozenset({"src/app.py"}),
        )
        with self.assertRaises(ResultApplyError):
            validate_plan(plan, observed_head="b" * 40)

    def test_scope_escape_is_rejected(self) -> None:
        plan = ApplyPlan(
            expected_head="a" * 40,
            changed_paths=("src/app.py", "secrets.txt"),
            allowed_paths=frozenset({"src/app.py"}),
        )
        with self.assertRaises(ResultApplyError):
            validate_plan(plan, observed_head="a" * 40)

    def test_unknown_outcome_blocks_retry_until_reconciled(self) -> None:
        ledger = ApplyLedger()
        prepared = ledger.prepare("apply-1")
        dispatched = ledger.mark_dispatched(prepared)
        unknown = ledger.mark_outcome_unknown(dispatched, "write response lost")

        with self.assertRaises(ResultApplyError):
            ledger.prepare("apply-2")

        reconciled = ledger.reconcile(
            unknown,
            expected_head="a" * 40,
            observed_head="b" * 40,
            applied_commit_parent="a" * 40,
        )
        self.assertEqual(reconciled.state, ApplyState.APPLIED)


if __name__ == "__main__":
    unittest.main()
