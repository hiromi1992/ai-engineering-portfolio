# AI Product / FDE Portfolio

Business / Productの課題をAIシステムの要件へ変換し、Coding Agentを実装手段として、**設計・検証・受入・再設計まで進める**個人開発Portfolioです。

> **My responsibility**  
> Problem Definition → Requirements → Architecture → Task Decomposition → Evaluation → Review → Acceptance / Redesign  
>
> **Implementation**  
> コード生成・直接実装は主にCodex / Claude等のCoding Agentを利用しています。

## 30秒で分かる現在地

### 強くカバーできている領域

| Capability | 一言でいうと | Coverage |
|---|---|---|
| **Problem / Requirement** | 曖昧な課題を実装可能な要件・受入条件へ落とす | **STRONG** |
| **AI Delivery Control** | AIへの委譲からReview・検証・受入までを制御する | **STRONG** |
| **State / Gate / Authority** | 誰が・いつ・何を決められるかを明確にする | **STRONG** |
| **Evaluation** | Test・Review・Readback等で結果を検証する | **STRONG** |
| **Evidence / Provenance** | 判断根拠を出典・時点・履歴とともに残す | **STRONG** |
| **Recovery** | 中断・失敗・結果不明から安全に再開する | **STRONG** |
| **Temporal / as-of** | 「いつ時点の情報か」を壊さず扱う | **STRONG** |
| **Experiment** | 仮説・Holdout・評価条件を固定して検証する | **STRONG** |
| **External Action Safety** | 外部操作を実行前後の確認付きで扱う | **STRONG** |
| **Observability** | 状態・失敗理由・履歴を後から追跡可能にする | **STRONG** |

### まだ十分にカバーできていない領域

- **Multi-Agent Competition / Multiple Brain × Lens**
- **Cross-Critique / Debate / Synthesis**
- **Dynamic Agent / Model Routing**
- **Cost / Latency-aware Routing**
- **Judge Ensemble / Advanced Selection**
- **Calibration / Confidence / Uncertainty**

現在のAgent Delegation・Independent Review・Evaluationを土台に、次に深めたい領域です。

## Capability × Product × Status

**Status:** IMPLEMENTED = 実装・検証済み / PARTIAL = 一部実装 / DESIGN = 設計段階

| Capability | AI Dev Foundation / RHP | Signal Harvester / ICP | FX Intelligence / TPI | FormPilot | Akashic |
|---|---|---|---|---|---|
| Problem → Requirement | ● IMPLEMENTED | ● IMPLEMENTED | ● IMPLEMENTED | ● IMPLEMENTED | ● DESIGN |
| AI Delivery Control | ● IMPLEMENTED | ○ IMPLEMENTED | ○ IMPLEMENTED | ○ IMPLEMENTED | ● DESIGN |
| Agent Orchestration | ● PARTIAL | ○ PARTIAL | ○ PARTIAL | ○ PARTIAL | ● DESIGN |
| State / Gate / Authority | ● IMPLEMENTED | ○ IMPLEMENTED | ○ IMPLEMENTED | ● IMPLEMENTED | ● DESIGN |
| Evaluation / Acceptance | ● IMPLEMENTED | ○ IMPLEMENTED | ● IMPLEMENTED | ● IMPLEMENTED | ● DESIGN |
| Evidence / Provenance | ● IMPLEMENTED | ● IMPLEMENTED | ● IMPLEMENTED | ○ IMPLEMENTED | ● DESIGN |
| Temporal / as-of / History | ○ IMPLEMENTED | ● IMPLEMENTED | ● IMPLEMENTED | ○ IMPLEMENTED | ● DESIGN |
| Experiment / Holdout | ○ PARTIAL | ○ PARTIAL | ● IMPLEMENTED | ○ PARTIAL | ● DESIGN |
| Recovery / Retry | ● IMPLEMENTED | ○ IMPLEMENTED | ○ IMPLEMENTED | ● IMPLEMENTED | ○ DESIGN |
| External Action Safety | ○ PARTIAL | — | — | ● PARTIAL | ○ DESIGN |
| Observability | ● IMPLEMENTED | ● IMPLEMENTED | ○ IMPLEMENTED | ● IMPLEMENTED | ○ DESIGN |
| Calibration / Confidence | △ PARTIAL | △ PARTIAL | ○ PARTIAL | — | ● DESIGN |
| Multi-Agent Competition | △ PARTIAL | — | △ PARTIAL | — | ● DESIGN |
| Dynamic Routing | △ DESIGN | — | — | — | ● DESIGN |
| Decision / Abstain | ○ PARTIAL | ○ PARTIAL | ● IMPLEMENTED | ○ PARTIAL | ● DESIGN |

→ [詳細なCapability Map](capabilities/README.md)

## Products / Systems

### 1. AI Development Foundation / Review-Handoff Platform
**AIに仕事を任せる工程そのものを安全にする基盤。**

Goal / Requirement / Gate / Readback / Review / Recovery / Handoffを扱い、AIやCIの自己申告ではなく外部の実状態を根拠に受入を判断します。

**Status:** Core contracts **IMPLEMENTED** / Live dispatch **intentionally blocked or externally coordinated**

→ [Project Detail](projects/01_ai_development_foundation.md)

### 2. Signal Harvester / ICP
**AIが何を根拠として知っているかを壊さない情報基盤。**

取得した情報をEvidence / Provenance / History / Delta / as-ofとともに保持し、後から再検証できる形にします。

**Status:** Core collection / replay / evidence **IMPLEMENTED** / External observation expansion **PARTIAL**

→ [Project Detail](projects/02_signal_harvester.md)

### 3. FX Intelligence / TPI
**仮説を、結果を見てから都合よく変えずに評価する検証システム。**

USD/JPYデータを対象に、Hypothesis / Backtest / Holdout / Evaluation / contamination preventionを扱います。

**Status:** Research / evaluation core v0.3.2 **IMPLEMENTED**

→ [Project Detail](projects/03_fx_intelligence.md)

### 4. FormPilot
**状態・回復・外部操作境界を持つWindows業務自動化。**

Desktop / Local DB / Queue / Recovery / Authorization / E2Eを扱い、外部操作へ進む前の安全なSoftware Deliveryを検証します。

**Status:** Confirmed baseline through Phase 4 **IMPLEMENTED** / later automation phases **PARTIAL / under validation**

→ [Project Detail](projects/04_formpilot.md)

## Products are connected by learning, not just code

```text
Failure
  ↓
Finding
  ↓
Design Principle
  ↓
Gate / Rule / Evaluation
  ↓
Shared Development Foundation
  ↓
Other Productsへ再適用
```

各Productで見つかった失敗を、その場限りの修正で終わらせず、共通Rule・Gate・Evaluation・Regressionへ戻すことを重視しています。

## Design North Star — Akashic Record

Evidenceを土台に、複数AIによる分析・反証・評価からDecision Opportunity / Learningへつなぐ長期的なDesign Explorationです。

**Current status:** **DESIGN**  
特にMulti-Agent competition / routing / cross-critique / advanced evaluationは、まだ未解決領域として明示しています。

→ [Akashic Record](vision/akashic-record.md)

## Selected Implementation Evidence

主要Project本体はprivate repositoryで継続開発しています。公開Portfolioでは、考え方を検証可能にするため、依存関係を減らした実装サンプルとTestを置いています。

- [Result Apply Guard — Python](samples/result_apply_guard.py)
- [Evidence Verification — JavaScript](samples/evidence_verification.js)
- [Automation Retry Policy — TypeScript](samples/automation_retry_policy.ts)

これらのコード生成・直接実装はCoding Agentを利用し、本人は要件・設計・テスト観点・Review・Acceptanceを担当しています。

## Implementation environment used in these projects

Python / TypeScript / JavaScript / Node.js / Electron / React / SQLite / PostgreSQL / Git / GitHub / CI / Unit Test / E2E / Regression Test

※上記は**個人開発で利用している実装環境**であり、手書き実装スキル一覧を意味しません。
