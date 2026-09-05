# FormPilot

**Status:** Confirmed baseline through Phase 4 — **IMPLEMENTED**  
**Later Form Automation phases:** **PARTIAL / under design & validation**

## What this project is

Windows Desktopで、入力データ・Campaign・Queue・Authorization・Recovery等を扱う業務自動化Projectです。

このPortfolioでは特に、**外部世界へ影響する処理を行うSoftwareを、State / Gate / Recovery / E2E込みでどう安全に作るか**を示すProjectとして位置づけています。

## Capabilities demonstrated

| Capability | Depth / Status |
|---|---|
| State / Gate / Authority | ● IMPLEMENTED |
| Recovery / Retry | ● IMPLEMENTED |
| Observability | ● IMPLEMENTED |
| Evaluation / E2E | ● IMPLEMENTED |
| Local Persistence | ● IMPLEMENTED |
| External Action Safety | ● PARTIAL |
| AI / Workflow Orchestration | ○ PARTIAL |

## Implemented baseline

- Electron + sandboxed React renderer
- narrow IPC bridge
- SQLite migration / campaign / target persistence
- crash-safe queue / recovery foundation
- PostgreSQL-backed workspace authentication / roles
- sender / template / schedule / pacing / test-mode settings
- Typecheck / Lint / Unit Test / Build / Desktop validation

Confirmed Phase 4では、外部HTTP/HTTPSアクセスや実送信を行わない境界を維持しています。

## Why it matters

外部フォーム送信のような操作では、「処理を開始したか」「実行されたか」「結果不明か」を間違えると、二重送信等の実世界影響につながります。

そこで、

- State
- Queue
- Checkpoint
- Reason Code
- Retry safety
- Authorization
- Readback
- E2E

を分離して扱う方向で段階的に設計しています。

## My responsibility

- Product / Phase requirement
- State / persistence / authorization requirement
- Coding Agentへの実装委譲
- Migration / Recovery / E2E観点
- CI / regression review
- Phase scope control
- Acceptance / Redesign判断

直接のコード生成は主にCoding Agentを利用しています。

## Connections

- **AI Development Foundation / RHP** — Gate / Readback / RecoveryをSoftware Deliveryへ適用
- **Signal Harvester / ICP** — Observability / history / evidenceの考え方を共有
- **Akashic Record** — 将来のDecision→Actionで必要になるExternal Action境界の学習へ接続

## Current gaps

- Portfolioで確認できる確定BaselineではReal Form Submissionは未実装
- Deterministic Form Engine以降は設計・検証が継続中
- AI browser fallbackは確定Baselineの実装対象外
