# FX Intelligence / Temporal Pattern Intelligence

**Status:** Research / Evaluation Core v0.3.2 — **IMPLEMENTED**

## What this project is

USD/JPYの市場データとSignalを使い、HypothesisをBacktest・Evaluationする研究 / 意思決定支援システムです。

このProjectの中心は「予測を当てること」だけではなく、**結果を見た後に条件を変えて評価を歪めないこと**です。

Trading Strategy、Position sizing、Broker Order、Execution authorityはScope外です。

## Capabilities demonstrated

| Capability | Depth / Status |
|---|---|
| Problem / Requirement | ● IMPLEMENTED |
| Experiment Design | ● IMPLEMENTED |
| Backtest / Evaluation | ● IMPLEMENTED |
| Holdout | ● IMPLEMENTED |
| Contamination Prevention | ● IMPLEMENTED |
| Evidence / Reproducibility | ● IMPLEMENTED |
| Decision / Abstain | ● IMPLEMENTED |
| Calibration / Confidence | ○ PARTIAL |
| Multi-Agent Reasoning | △ PARTIAL |

## Problem

分析では、結果を見た後で条件や評価基準を変更すると、見かけ上の成績を簡単に改善できます。

そこで、

- Discovery
- Validation
- Holdout
- Evaluation criteria
- Experiment state

を分け、どこまで観測済みかを明示的に管理する方向で設計しています。

## Key design decisions

### 1. Holdoutを評価の最後まで開かない
未知データを未知のまま残し、最終確認用のEvidenceとして扱います。

### 2. 結果観測後の条件変更を「改善」ではなく汚染として扱う
観測済み結果に合わせた変更を、そのまま同じExperimentの正当な結果として扱いません。

### 3. ResearchとExecutionを分離する
このRepositoryにはBroker OrderやExecution authorityを持たせません。

### 4. Replay / Reproducibilityを重視する
評価条件と使用データを固定し、後から同じ条件を再確認できる構造を重視しています。

## My responsibility

- Research question / Hypothesisの定義
- Evaluation設計
- Dataset split / Holdout方針
- Acceptance / Rejection条件
- Coding Agentへの実装指示
- Test / Result review
- 汚染リスクの判定
- 続行・修正・再設計の判断

直接のコード生成は主にCoding Agentを利用しています。

## How this connects to other projects

**Signal Harvester / ICP** で扱うEvidence / Temporal / as-ofの考え方を、Experimentデータと評価時点の管理へ応用。

**AI Development Foundation / RHP** の「自己申告ではなくEvidenceで受入する」考え方を、Backtest / Evaluationにも適用。

このProjectで得たHoldout・汚染防止・Abstainの考え方は、将来の **Akashic Record** におけるAI Evaluation / Selectionへ接続します。

## Current gaps

- Production-scale LLM Evalではない
- Judge Ensemble / Learned Judgeは未実装
- Confidence calibrationは限定的
- Multi-Agent competing hypothesesは探索段階
