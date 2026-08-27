# AI Engineering Portfolio

AIを詳細実装のレバレッジとして使いながら、**問題設定・要件・設計方針・検証・受入まで人間側で責任を持つ**開発を行っています。

主な関心領域は、AIエージェント、情報収集・データ基盤、検索・知識基盤、評価・可観測性、本番運用です。

## 開発スタイル

Claude Code / Codex などのAIコーディングエージェントを、詳細実装やレビュー支援に積極的に利用しています。

一方で、以下は自分の責任範囲として扱っています。

- 問題設定・要件整理
- 設計方針・受入条件の定義
- 実装タスクの分解とAIへの委譲
- 生成された差分の確認
- テスト・CI・回帰確認
- 不具合の原因切り分け
- 修正方針・受入可否の判断
- 実装結果と設計意図の整合確認

AIが生成したコードをそのまま採用するのではなく、**仕様・差分・テスト・CI・実際の状態を確認してから受け入れる**ことを重視しています。

## Projects

| Project | 主なテーマ | 技術・設計上の要点 |
|---|---|---|
| [AI Development Foundation / Loop Engineering](projects/01_ai_development_foundation.md) | AI開発基盤・実行制御 | Task/Run状態、検証、回復、CI、fail-closed、AIレビュー連携 |
| [Signal Harvester](projects/02_signal_harvester.md) | 情報収集・データ基盤 | GitHub / Hacker News / RSS / Web、正規化、履歴、差分、Evidence / Provenance、Replay |
| [Review / Handoff Platform](projects/03_review_handoff_platform.md) | AI実装・レビュー連携 | Request/Result Binding、GitHub Readback、stale検知、OUTCOME_UNKNOWN、blind retry抑止 |
| [FormPilot](projects/04_formpilot.md) | Windowsデスクトップアプリ | Electron / React、SQLite / PostgreSQL、Queue / Recovery、Observability、E2E / CI |

## Representative Engineering Evidence

- AI開発基盤で、レビュー実行安全性に関する targeted tests **23 / 23 PASS**
- Validation regressionで **1 positive baseline + 37 negative mutations** を検証
- Signal Harvesterで、履歴・差分・Evidence・Provenance・network-free Replayを実装
- Review / Handoff Platformで、stale Head・allowlist escape・不正状態遷移をfail-closedで拒否
- FormPilotで、Governance / Typecheck / Lint / Unit Test / Build / authenticated Electron E2EをCI検証

## 技術スタック

- **言語**: Python, TypeScript / JavaScript, SQL
- **アプリケーション**: Node.js, Electron, React
- **データ**: SQLite, PostgreSQL
- **開発・品質**: Git, GitHub, GitHub Actions, Unit Test, E2E Test, Regression Test
- **AI支援開発**: Claude Code, Codex

## 開発で重視していること

### 1. 「動いた」で終わらせない
正常系だけでなく、状態不整合、stale result、retry、failure、権限境界、回帰まで明示的に扱います。

### 2. Evidenceを残す
「実装した」という自己申告だけではなく、テスト、CI、PR、差分、状態遷移、readbackなど、後から検証できる形を残します。

### 3. AI生成コードを鵜呑みにしない
AI出力は候補実装として扱い、差分・仕様適合・テスト・CIを確認してから受け入れます。

### 4. 個別対応を再利用可能な仕組みにする
単発修正ではなく、Contract、Validator、State Model、Pipeline、Regression Testへ落とし込むことを意識しています。

## Source Code

主要プロジェクトはPrivate Repositoryで継続開発しています。

このPublic Portfolioでは、採用選考で確認しやすいように、**設計意図・アーキテクチャ・本人の役割・検証Evidence**を要約しています。

## 今後深めたい領域

**価値ある情報の収集 → 構造化 → 検索・分析 → AIエージェント → 本番運用 → 意思決定**

まで一貫して扱う、Applied AI / AI Agent / Data Intelligence / FDE領域で、Production環境での実装経験を深めたいと考えています。
