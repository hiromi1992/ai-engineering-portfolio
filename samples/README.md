# 公開コードサンプル

主要Project本体はprivate repositoryで継続開発しています。

ここでは採用選考で設計・制御ロジックを確認できるよう、実Projectの考え方を依存関係の少ない形へ切り出したサンプルを公開しています。

> **Implementation disclosure**  
> コード生成・直接実装は主にCodex / Claude等のCoding Agentを利用しています。  
> 本人はProblem / Requirement / Architecture / Acceptance Criteria / Test観点 / Review / Acceptanceを担当しています。

| サンプル | 実装環境 | 見てほしい点 |
|---|---|---|
| [AI実装結果の安全な適用](result_apply_guard.py) | Python | State、Head一致、変更範囲、OUTCOME_UNKNOWN、Blind retry防止 |
| [取得証拠の検証と再現](evidence_verification.js) | JavaScript | SHA-256、Evidence位置、改変検知、network-free replay |
| [自動処理の再試行ポリシー](automation_retry_policy.ts) | TypeScript | Failure classification、retry safety、fail-closed decision |

## Why these samples

Portfolioで示したいのは言語知識そのものではなく、AIやAutomationを本番に近づけるときに必要になる、

- State
- Evidence
- Evaluation
- Recovery
- Reproducibility
- Safe failure

の考え方です。

製品固有の識別子・設定・周辺依存は公開用に削除または単純化しています。
