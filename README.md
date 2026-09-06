# AI Product / FDE Portfolio

法人営業、新規事業、Webプロダクト開発を経験し、Yagishでは新規事業領域に約4年従事しました。うち約2年はプロダクト／開発ディレクション・開発PMを兼務し、課題整理、要件定義、画面・仕様設計、開発推進、QA、リリース後の改善まで担当しています。

2026年7月からは、Coding Agentを活用した個人開発に取り組んでいます。**問題設定、要件、設計方針、検証方法、受入・再設計の判断は自分で行い、コード生成・直接実装はCodex / Claude等へ委譲**しています。

このPortfolioでは、実務の社名・取引先・非公開KPIは掲載せず、個人開発での設計判断、検証方法、実装済みの範囲を公開しています。実務経験の詳細は職務経歴書に記載しています。

## 個人開発の全体像

| プロジェクト | 何を作っているか | 現在の状態 |
|---|---|---|
| [AI開発基盤 / Review-Handoff Platform](projects/01_ai_development_foundation.md) | Coding Agentへ実装を任せた後、Git・テスト・実際の変更内容を確認して受け入れるかを判断する共通基盤 | 主要機能を実装済み |
| [Signal Harvester / ICP](projects/02_signal_harvester.md) | WebやGitHub等から情報を収集し、出典・取得時点・履歴・差分とともに保存する情報基盤 | 主要機能を実装済み、観測範囲を拡張中 |
| [FX Intelligence / TPI](projects/03_fx_intelligence.md) | USD/JPYを対象に、未使用データを残したまま仮説とバックテストを検証する研究基盤 | 研究・評価基盤を実装済み |
| [FormPilot](projects/04_formpilot.md) | Webフォーム業務自動化に向け、状態管理・復旧・実行履歴を扱うWindowsアプリ | 基盤を実装済み、自動実行を検証中 |
| [Akashic Record](vision/akashic-record.md) | 上記で得た知見を、複数AIによる分析・評価・意思決定支援へつなぐ長期構想 | 設計段階 |

## このPortfolioで見てほしいこと

- **課題を要件へ落とす**：曖昧な目的や業務課題を、実装可能な要件・仕様・受入条件へ整理する
- **AIへ実装を任せる**：Coding Agentへ実装を委譲しつつ、対象範囲や完了条件は自分で定義する
- **結果を確認して受け入れる**：AIやCIの「成功」だけで終わらせず、Git・テスト・実際の変更内容まで確認する
- **失敗から設計を変える**：不具合を個別修正で終わらせず、確認ルールや回帰テストへ反映する
- **検証条件を守る**：分析では未使用データや評価条件を分け、結果を見た後の都合のよい調整を避ける

詳しい対応関係は [経験領域とプロジェクト対応](capabilities/README.md) にまとめています。

## 代表的な改善事例

- [AIが成功を報告したが、実際には変更されていなかった](case-studies/01_readback_failure.md)
- [自動テストが通った後の独立レビューで設計上の問題が見つかった](case-studies/02_green_ci_independent_review.md)
- [結果を見た後の条件変更で評価が歪むリスクを防いだ](case-studies/03_experiment_contamination.md)

## 公開コードサンプル

主要プロダクト本体は非公開リポジトリで開発しています。公開側には、設計上の考え方を確認できる小さなサンプルとテストを置いています。

- [AI実装結果を安全に適用する仕組み — Python](samples/result_apply_guard.py)
- [取得した情報の根拠を再検証する仕組み — JavaScript](samples/evidence_verification.js)
- [自動処理の再試行可否を判断する仕組み — TypeScript](samples/automation_retry_policy.ts)

→ [サンプルの説明](samples/README.md)

## 個人開発で利用している環境

Python / TypeScript / JavaScript / Node.js / Electron / React / SQLite / PostgreSQL / Git / GitHub / CI / Unit Test / E2E / Regression Test

※上記は個人開発で利用している環境です。手書きでの実装スキルを示す一覧ではありません。
