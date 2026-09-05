# Case Study — Do not improve an experiment after seeing the answer

**Theme:** Holdout / Experiment Integrity / Decision

## Situation

Evaluation結果を観測した後で条件や評価ルールを変更すると、その変更は同じExperimentの純粋な改善なのか、結果への適合なのか区別できなくなります。

## Risk

後知恵で条件を調整すると、Backtestや評価値が良く見えても再現性・一般化性能を失います。

## Decision

FX Intelligence / TPIでは、

- Discovery
- Validation
- Holdout
- Evaluation criteria
- Observation state

を分離。

結果観測後の条件変更を、元Experimentの正当な継続ではなく**contamination risk**として扱う方針を採用しています。

## Learning transferred

この考え方は市場データだけでなく、将来のLLM / Agent Evaluationでも、

- Benchmark leakage
- Judge tuning after seeing results
- Selection bias
- Holdout misuse

を避ける設計へ接続できます。

## Capability link

**Experiment → Holdout → Evaluation → Falsification → Abstain / Decision**
