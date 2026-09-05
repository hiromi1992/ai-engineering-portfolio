# Capability Coverage Map

このページは、**どの能力を・どのProductで・どの深さまで扱っているか**を横断して確認するためのIndexです。

## Status

- **IMPLEMENTED** — 実装・検証済み
- **PARTIAL** — 一部実装・限定条件で検証済み
- **DESIGN** — 要件・設計段階
- **NOT YET** — 未着手

## Depth

- **● Primary** — そのProductの主要テーマ
- **○ Applied** — 実際に利用・検証
- **△ Exploration** — 探索・初期段階
- **—** — 対象外

## Coverage

| Capability | 概要 | AI Dev / RHP | Signal / ICP | FX / TPI | FormPilot | Akashic |
|---|---|---|---|---|---|---|
| **Problem / Requirement** | 課題を要件・受入条件へ落とす | ● IMPLEMENTED | ● IMPLEMENTED | ● IMPLEMENTED | ● IMPLEMENTED | ● DESIGN |
| **AI Delivery Control** | AIへの委譲→Review→受入を制御 | ● IMPLEMENTED | ○ IMPLEMENTED | ○ IMPLEMENTED | ○ IMPLEMENTED | ● DESIGN |
| **Agent Orchestration** | Agent/Workflowの役割・状態を制御 | ● PARTIAL | ○ PARTIAL | ○ PARTIAL | ○ PARTIAL | ● DESIGN |
| **State / Gate / Authority** | 状態・権限・進行条件を固定 | ● IMPLEMENTED | ○ IMPLEMENTED | ○ IMPLEMENTED | ● IMPLEMENTED | ● DESIGN |
| **Evaluation** | 出力をTest/Review/Readback等で評価 | ● IMPLEMENTED | ○ IMPLEMENTED | ● IMPLEMENTED | ● IMPLEMENTED | ● DESIGN |
| **Evidence / Provenance** | 判断根拠と出典を追跡可能にする | ● IMPLEMENTED | ● IMPLEMENTED | ● IMPLEMENTED | ○ IMPLEMENTED | ● DESIGN |
| **Temporal / as-of** | 時点・履歴・差分を保持 | ○ IMPLEMENTED | ● IMPLEMENTED | ● IMPLEMENTED | ○ IMPLEMENTED | ● DESIGN |
| **Experiment / Holdout** | 実験条件を固定し汚染を防ぐ | ○ PARTIAL | ○ PARTIAL | ● IMPLEMENTED | ○ PARTIAL | ● DESIGN |
| **Recovery / Retry** | 中断・失敗・結果不明から安全に復旧 | ● IMPLEMENTED | ○ IMPLEMENTED | ○ IMPLEMENTED | ● IMPLEMENTED | ○ DESIGN |
| **External Action Safety** | 不可逆操作を安全境界付きで扱う | ○ PARTIAL | — | — | ● PARTIAL | ○ DESIGN |
| **Observability** | 状態・失敗・履歴を追跡 | ● IMPLEMENTED | ● IMPLEMENTED | ○ IMPLEMENTED | ● IMPLEMENTED | ○ DESIGN |
| **Calibration / Confidence** | 信頼度・不確実性を評価 | △ PARTIAL | △ PARTIAL | ○ PARTIAL | — | ● DESIGN |
| **Judge / Selection** | 複数候補を評価・選択 | △ PARTIAL | — | ○ PARTIAL | — | ● DESIGN |
| **Multi-Agent Competition** | 独立推論・競合仮説を扱う | △ PARTIAL | — | △ PARTIAL | — | ● DESIGN |
| **Cross-Critique / Debate** | Agent同士の反証・批評 | △ PARTIAL | — | △ PARTIAL | — | ● DESIGN |
| **Dynamic Routing** | 状況に応じてAgent/Modelを切り替える | △ DESIGN | — | — | — | ● DESIGN |
| **Cost / Latency Routing** | 品質・費用・時間のTrade-offで選択 | △ DESIGN | — | — | — | ● DESIGN |
| **Decision / Abstain** | 判断・保留・人へのEscalationを扱う | ○ PARTIAL | ○ PARTIAL | ● IMPLEMENTED | ○ PARTIAL | ● DESIGN |

## Strong today

- **AI Delivery / State / Gate / Recovery**
- **Evaluation / Acceptance**
- **Evidence / Provenance / as-of**
- **Experiment / Holdout**
- **Production-oriented observability**

## Main gaps

- **Multiple Brain × Multiple Lens**
- **Competing hypotheses / Cross-Critique**
- **Dynamic Agent / Model Routing**
- **Judge Ensemble / Advanced Selection**
- **Calibration / Confidence / Uncertainty**

このGapは隠さず、今後の学習・実務経験の獲得対象として扱っています。

## Product connections

- **AI Development Foundation / RHP** — AI Deliveryそのものを制御
- **Signal Harvester / ICP** — 判断に使うEvidenceを整備
- **FX Intelligence / TPI** — HypothesisとEvaluationを厳密化
- **FormPilot** — State / Recovery / External Actionへ適用
- **Akashic Record** — 上記をMulti-Agent Decision Intelligenceへ統合するDesign North Star
