# AI Product / FDE Portfolio

Business / Productの課題をAIシステムの要件へ変換し、Coding Agentを実装手段として、**設計・検証・受入・再設計まで進める**個人開発Portfolioです。

> **My responsibility**  
> Problem Definition → Requirements → Architecture → Task Decomposition → Evaluation → Review → Acceptance / Redesign
>
> **Implementation**  
> コード生成・直接実装は主にCodex / Claude等のCoding Agentを利用しています。

## 30秒で分かる現在地

### Strong

| Capability | 一言でいうと |
|---|---|
| **Problem / Requirement** | 曖昧な課題を、実装可能な要件・受入条件へ落とす |
| **AI Delivery Control** | AIへの委譲からReview・検証・受入までを制御する |
| **State / Gate / Authority** | 誰が・いつ・何を決められるかを明確にする |
| **Evaluation** | Test・Review・Readback等で結果を検証する |
| **Evidence / Provenance** | 判断根拠を出典・時点・履歴とともに残す |
| **Recovery** | 中断・失敗・結果不明から安全に再開する |
| **Temporal / as-of** | 「いつ時点の情報か」を壊さず扱う |
| **Experiment / Holdout** | 仮説・評価条件を固定し、結果観測後の汚染を防ぐ |

### Partial / growing

| Capability | 現在地 |
|---|---|
| **Agent Orchestration** | Delegation / Handoff / Workflow制御は実装済み。本格的なMulti-Agent競合・動的Routingは未完成 |
| **External Action Safety** | State / Queue / Recovery境界は実装済み。Real external actionまでの実装は継続中 |

→ **[Capability × Product × Implementation Status の詳細](capabilities/README.md)**

## Products

| Product | 何を検証しているか | Status |
|---|---|---|
| **[AI Development Foundation / RHP](projects/01_ai_development_foundation.md)** | AIに仕事を任せる工程そのもの。Gate / Readback / Review / Recovery | **IMPLEMENTED / PARTIAL** |
| **[Signal Harvester / ICP](projects/02_signal_harvester.md)** | AIへ渡すEvidenceの出典・時点・履歴・差分を壊さない | **IMPLEMENTED / PARTIAL** |
| **[FX Intelligence / TPI](projects/03_fx_intelligence.md)** | Hypothesis / Backtest / Holdout / Evaluationを厳密に扱う | **IMPLEMENTED** |
| **[FormPilot](projects/04_formpilot.md)** | State / Queue / Recovery / E2Eを実世界Softwareへ適用する | **IMPLEMENTED / PARTIAL** |
| **[Akashic Record](vision/akashic-record.md)** | 上記をMulti-Agent Decision Intelligenceへ統合するNorth Star | **DESIGN** |

**Status:** IMPLEMENTED = 実装・検証済み / PARTIAL = 一部実装・限定条件で検証 / DESIGN = 設計段階

## What is not yet fully covered

次に深めたいのは **Multi-Agent Intelligence × Advanced Evaluation** です。

- Multiple Brain × Multiple Lens
- Competing hypotheses / Cross-Critique / Debate
- Dynamic Agent / Model Routing
- Cost / Latency-aware Routing
- Judge Ensemble / Advanced Selection
- Calibration / Confidence / Uncertainty

未実装領域も含めて明示し、**「何ができるか」だけでなく「何がまだできないか」も分かるPortfolio**にしています。

## How the projects connect

```text
Failure
  ↓
Finding
  ↓
Design Principle
  ↓
Gate / Rule / Evaluation
  ↓
Shared Foundation
  ↓
Other Productsへ再適用
```

各Productで見つかった失敗を単発修正で終わらせず、共通Rule・Gate・Evaluation・Regressionへ還流します。

### Examples

- **[Success response, but no real change](case-studies/01_readback_failure.md)** — AIの成功申告ではなくReadbackで受入する
- **[Green CI was not enough](case-studies/02_green_ci_independent_review.md)** — CI PASS後もIndependent Reviewで設計へ戻す
- **[Do not improve an experiment after seeing the answer](case-studies/03_experiment_contamination.md)** — Holdoutと実験汚染を分離する

## Selected Implementation Evidence

主要Project本体はprivate repositoryで継続開発しています。公開側では、設計・制御ロジックを確認できる小さな実装サンプルとTestを置いています。

- [Result Apply Guard — Python](samples/result_apply_guard.py)
- [Evidence Verification — JavaScript](samples/evidence_verification.js)
- [Automation Retry Policy — TypeScript](samples/automation_retry_policy.ts)

コード生成・直接実装はCoding Agentを利用し、本人はRequirement / Architecture / Acceptance Criteria / Test観点 / Review / Acceptanceを担当しています。

**Implementation environment:** Python / TypeScript / JavaScript / Node.js / Electron / React / SQLite / PostgreSQL / Git / GitHub / CI / Unit Test / E2E / Regression Test

※上記は個人開発で利用している実装環境であり、手書き実装スキル一覧を意味しません。
