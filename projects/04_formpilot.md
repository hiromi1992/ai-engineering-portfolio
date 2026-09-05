# FormPilot

**現在の状態:** Phase 4までの基盤は **実装済み**  
**後続のフォーム自動化機能:** 一部実装・設計 / 検証継続中

## 何をするものか

Webフォームへの入力・送信を安全に自動化するための**Windows業務自動化アプリ**です。

このPortfolioでは特に、**外部へ影響する処理を行うSoftwareを、状態管理・復旧・権限・E2Eまで含めてどう安全に作るか**を示すプロダクトとして位置づけています。

## このプロダクトで扱っている能力

| 能力 | 現在地 |
|---|---|
| 状態・進行条件・権限管理 | ● 実装済み |
| 失敗時の復旧・再試行 | ● 実装済み |
| 可観測性 | ● 実装済み |
| 評価・E2E | ● 実装済み |
| Local保存 | ● 実装済み |
| 外部操作の安全設計 | ● 一部実装 |
| AI / Workflow制御 | ○ 一部実装 |

## 実装済みの基盤

- Electron + ReactのDesktop構成
- 制限したIPC Bridge
- SQLite migration / Campaign / Target保存
- Crash-safeなQueue / Recovery基盤
- PostgreSQLを使ったWorkspace認証・Role管理
- Sender / Template / Schedule / Pacing / Test mode設定
- Typecheck / Lint / Unit Test / Build / Desktop検証

Phase 4までの確定Baselineでは、外部HTTP/HTTPSアクセスや実送信を行わない安全境界を維持しています。

## なぜこの設計が必要か

外部フォーム送信のような操作では、

- 処理を開始したか
- 実行されたか
- 結果が不明か

を間違えると、二重送信など実世界への影響につながります。

そこで、

- 状態
- Queue
- Checkpoint
- 失敗理由
- 再試行可否
- 権限
- 実状態確認
- E2E

を分けて段階的に設計しています。

## 本人の担当

- 製品要件・Phase設計
- 状態・保存・権限要件の整理
- Coding Agentへの実装委譲
- Migration / Recovery / E2E観点
- CI / 回帰確認
- Phase単位のScope管理
- 受入 / 再設計判断

直接のコード生成は主にCoding Agentを利用しています。

## 他プロダクトとのつながり

- **AI開発基盤 / RHP** — 状態管理・実状態確認・復旧の考え方をSoftware Deliveryへ適用
- **Signal Harvester / ICP** — 履歴・可観測性・根拠管理の考え方を共有
- **Akashic Record** — 将来の「判断→実行」で必要になる外部操作境界へ接続

## まだできていないこと

- 確定Baselineでは実フォーム送信は未実装
- Deterministic Form Engine以降は設計・検証継続中
- AI BrowserによるFallbackは確定Baselineの実装対象外
