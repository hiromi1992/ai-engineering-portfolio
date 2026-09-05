# Case Study — Success response, but no real change

**Theme:** Readback / Acceptance / AI Delivery Control

## Situation

Coding Agent側の実行結果が成功として返った一方、期待していた実ファイル変更が確認できないケースがありました。

## Risk

実行側のexit statusや自己申告だけで完了扱いすると、実際には変更されていない状態を成功として次工程へ進めてしまいます。

## Decision

「Agentが成功と言ったこと」と「Repositoryの実状態」を分離。

完了判定にはReadbackを要求し、対象ファイル・内容・Hash等の実状態が期待と一致するまで受入しない方針へ変更しました。

## Learning transferred

このFindingを単発の再実行で終わらせず、

- External state is authority
- OUTCOME_UNKNOWNを独立状態として扱う
- Blind retryを禁止する
- Acceptance前にReadbackする

という共通原則へ変換し、AI Development Foundation / RHPのGateへ反映しています。

## Capability link

**AI Delivery Control → Evidence / Readback → Evaluation → Acceptance**
