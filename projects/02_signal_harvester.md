# Signal Harvester / ICP

**Status:** Core collection / history / replay / evidence — **IMPLEMENTED**  
**Broader external observation runtime:** **PARTIAL / expanding**

## What this project is

GitHub / Hacker News / RSS / Web等から取得した情報を、**Evidence・Provenance・History・Delta・as-ofを保ったまま後段AIへ渡す**ための情報基盤です。

単なるCrawlerではなく、

> 「何を・いつ・どこから・どの方法で取得し、その後どう変わったか」

を後から再検証できることを重視しています。

## Capabilities demonstrated

| Capability | Depth / Status |
|---|---|
| Evidence / Provenance | ● IMPLEMENTED |
| Temporal / as-of / History | ● IMPLEMENTED |
| Replay / Reproducibility | ● IMPLEMENTED |
| Delta / Change Detection | ● IMPLEMENTED |
| Observability | ● IMPLEMENTED |
| Evaluation | ○ IMPLEMENTED |
| Agent / Workflow Orchestration | ○ PARTIAL |
| Calibration / Confidence | △ PARTIAL |

## Problem

後段でAI分析や意思決定に使う場合、単純な収集だけでは不足します。

- 転載や再取得を独立したEvidenceとして数えてしまう
- Web更新後に「当時何を読んだか」が再現できない
- 引用が元本文のどこに存在したか追えない
- SourceとRetrieval Methodを混同する
- 過去評価を再実行するとLive Webの未来情報が混ざる

## Key decisions

### Preserve evidence, not just extracted values
本文・Hash・取得時刻・Source・Provider等を分けて保存します。

### Replay stays network-free
過去Runの再検証では保存済みデータを使い、Live Networkへ取り直さないことを重視します。

### Source and retrieval are separate concepts
「何の情報か」と「どう取得したか」を分離し、Provider変更でもSource identityを壊さないようにします。

### Expansion is fail-closed
外部取得の拡張では、承認・Policy・Provider条件等が揃わなければFetchしない設計を採用しています。

## Evidence

- GitHub / Hacker News observation
- RSS 2.0 / Atom 1.0
- Run History / Delta
- replay without network access
- immutable extracted Evidence
- Provenance snapshots
- versioned Signal identity
- fixture / mockによるRegression

## My responsibility

- Product requirement / data contract設計
- Identifier / Provenance / as-of方針
- Coding Agentへの実装委譲
- Test / replay / regression観点
- Diff / CI / result review
- 仕様と実装の不一致に対する修正判断

直接のコード生成は主にCoding Agentを利用しています。

## Connections

- **AI Development Foundation / RHP** — Evidence / Readbackで受入する思想を共有
- **FX Intelligence / TPI** — 時点・履歴・再現可能なEvidenceをExperimentへ接続
- **Akashic Record** — 将来のReasoningが依存するCanonical Evidence layerへ接続

## Current gaps

- 全Sourceを常時観測するProduction-scale runtimeではない
- Source coverage / scheduler healthは拡張・運用上の課題
- Multi-Agent reasoning自体はこのProjectの責務外
