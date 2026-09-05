# FormPilot

**現在の状態:** 状態管理・Queue・認証・観測基盤は **実装済み**  
**フォーム自動実行:** 段階的に設計・検証中。実フォーム送信は未実装

## 概要

Webフォーム業務の自動化に向けて、**入力データ・状態・Queue・権限・復旧・実行履歴を管理するWindowsデスクトップアプリ**です。

このポートフォリオでは、外部へ影響する処理を持つソフトウェアを、**状態管理・復旧・権限・E2E検証まで含めて安全に設計する**事例として位置づけています。

## このプロダクトで実践・検証している領域

| 領域 | 現在地 |
|---|---|
| 状態・進行条件・権限管理 | ● 実践・検証済み |
| 失敗時の復旧・再試行 | ● 実践・検証済み |
| 可観測性 | ● 実践・検証済み |
| 評価・E2E | ● 実践・検証済み |
| Localデータ保存 | ● 実践・検証済み |
| Queue / Workflow管理 | ● 実践・検証済み |
| 外部操作の安全設計 | ● 一部実践 |

## 実装済みの主な基盤

- Electron + Reactによるデスクトップ構成
- 制限されたIPC Bridge
- SQLite Migration / Campaign / Target保存
- Crash-safeなQueue / Recovery基盤
- PostgreSQLを利用したWorkspace認証・Role管理
- Sender / Template / Schedule / Pacing / Test mode設定
- Typecheck / Lint / Unit Test / Build / Desktop検証
- Automation Event / Reason Code等の観測基盤

実フォーム送信を行う前に、状態・失敗理由・再試行可否を観測できる基盤を先に整備しています。

## 対象とした課題

外部フォーム送信のような操作では、

- 処理を開始したか
- 実際に実行されたか
- 結果が不明な状態か

を誤ると、二重送信など実世界への影響につながります。

そのため、状態・Queue・Checkpoint・失敗理由・再試行可否・権限・実状態確認・E2Eを分離して設計しています。

## 担当範囲

- 製品要件・Phase設計
- 状態・保存・権限要件の整理
- Coding Agentへの実装委譲
- Migration / Recovery / E2E観点の設計
- CI / 回帰確認
- Phase単位のScope管理
- 受入 / 再設計判断

コード生成・直接実装には主にCoding Agentを活用しています。

## 他プロダクトとの関係

- **AI開発基盤 / RHP** — 状態管理・実状態確認・復旧の考え方を開発・実行フローへ適用
- **Signal Harvester / ICP** — 履歴・可観測性・根拠管理の考え方を共有
- **Akashic Record** — 将来の「判断から実行」へつなぐ際に必要な外部操作境界へ接続

## 今後の拡張領域

- Deterministic Form Engineの実行機能
- 実フォーム送信
- 実測データに基づくAI Browser / AI Fallbackの採用判断
