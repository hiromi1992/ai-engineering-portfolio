# Case Study — Green CI was not enough

**Theme:** Independent Review / Adversarial Evaluation / Redesign

## Situation

Automated checksがGreenになった後でも、Independent ReviewによってMaterial Findingが複数検出されたケースがありました。

## Risk

CI PASSを「設計が正しい」証拠として扱うと、Testが持っていない観点や前提ミスを見逃します。

## Decision

Green CIを最終Authorityにせず、

1. Automated Test
2. Independent Review
3. Finding analysis
4. Redesign
5. Regression / adversarial checks
6. Fresh review

というLoopへ戻しました。

## Learning transferred

「Testが通ったか」ではなく、**どのFailure ModeをTestできているか**を見る方針へ変更。

Findingを次回以降のGate / Rule / Regressionへ還流する設計を、複数Projectで共通化しています。

## Capability link

**Evaluation → Independent Review → Falsification → Regression → Learning Loop**
