# Signal Harvester

## 概要

GitHub / Hacker News / RSS / Webなど複数SourceからSignalを取得し、**履歴・差分・Evidence・Provenanceを保持しながら再現可能に扱う情報収集基盤**です。

**Source → Fetch → Normalize → Persist History → Delta → Evidence / Provenance → Canonical Signal → Replay**

という流れを重視しています。

## 主な実装

- GitHub / Hacker News observation
- RSS 2.0 / Atom 1.0
- bounded Web retrieval
- Source Registry
- Provider separation
- normalized item persistence
- run history
- delta-first comparison
- immutable Evidence artifacts
- Provenance snapshot
- versioned Signal identity
- network-free replay
- fixture / mock based regression tests

## 設計上のポイント

### Evidence / Provenance
「どこから取得した情報か」「どの方法・時点で取得したか」を後から追跡できることを重視しています。

### Replay
保存済みRunを利用し、Networkへ再アクセスせずに評価・再現できる構造にしています。

### Source / Provider分離
情報源そのものと取得手段を分離し、取得方法が変わってもSignal identityを安易に壊さない設計を意識しています。

### Fail-closed
Source approvalや取得条件を満たさない場合に、勝手にLive Fetchへ進まない設計です。

## 私の役割

- Product / Requirements設計
- Data contract / identity / provenance方針
- implementation decomposition
- AI-assisted implementation
- test / regression / replay観点の設計
- diff / CI / behavior確認
- 仕様と実装の不一致修正

## このProjectで示したいこと

単純なCrawlerではなく、**Data Pipeline / Canonicalization / Temporal Data / Provenance / Evaluation-ready Data**を意識した情報基盤を設計・実装しています。
