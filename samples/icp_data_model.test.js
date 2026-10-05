import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createObservationCandidate,
  createPromotionEnvelope,
  validateCandidate,
} from './icp_data_model.js';

const candidate = createObservationCandidate({
  observationId: 'obs-2026-001',
  sourceRef: 'source:official:1',
  publishedAt: '2026-10-01T09:00:00+09:00',
  observedAt: '2026-10-02T12:00:00+09:00',
  claims: ['新しい機能が公開された'],
  counterevidence: ['本番利用率は未確認'],
  unknowns: ['利用企業数'],
  relation: 'NEW',
});

test('発生時刻と観測時刻、反証、未知事項を分けて保持する', () => {
  assert.equal(candidate.publishedAt, '2026-10-01T09:00:00+09:00');
  assert.equal(candidate.observedAt, '2026-10-02T12:00:00+09:00');
  assert.deepEqual(candidate.counterevidence, ['本番利用率は未確認']);
  assert.deepEqual(candidate.unknowns, ['利用企業数']);
});

test('根拠と出所が揃った候補だけ検証済みにできる', () => {
  const result = validateCandidate(candidate, {
    evidenceRefs: ['evidence:1'],
    provenanceRefs: ['source:official:1'],
  });
  assert.equal(result.status, 'VALIDATED');
});

test('未検証の候補は正式データ層へ昇格できない', () => {
  const rejected = validateCandidate(candidate);
  assert.equal(rejected.status, 'REJECTED');

  assert.throws(
    () => createPromotionEnvelope(candidate, rejected),
    /検証済みでない候補/,
  );
});

test('検証済み候補は元の根拠・反証・時刻を保持したまま昇格できる', () => {
  const validated = validateCandidate(candidate, {
    evidenceRefs: ['evidence:1'],
    provenanceRefs: ['source:official:1'],
  });

  const promotion = createPromotionEnvelope(candidate, validated);
  assert.equal(promotion.promotionStatus, 'VALIDATED_FOR_IMPORT');
  assert.equal(promotion.sourceCandidateId, candidate.observationId);
  assert.deepEqual(promotion.counterevidence, candidate.counterevidence);
  assert.equal(promotion.observedAt, candidate.observedAt);
});
