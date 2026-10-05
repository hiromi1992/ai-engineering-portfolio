/**
 * 公開用サンプル:
 * ICPで集めた情報を「候補」として保持し、
 * 検証済みのものだけ次の正式データ層へ渡す最小モデル。
 *
 * 実プロジェクトの設計思想から、
 * - 発生時刻と観測時刻の分離
 * - 支持材料 / 反証 / 未知事項の分離
 * - 新規 / 更新 / 重複の関係
 * - 候補と正式データの責任分界
 * を抜き出して単純化しています。
 */

const RELATIONS = new Set(['NEW', 'UPDATE', 'DUPLICATE']);
const COVERAGE = new Set([
  'OBSERVED',
  'OBSERVED_ZERO',
  'NOT_OBSERVED',
  'UNAVAILABLE',
  'BUDGET_EXHAUSTED',
]);

export function createObservationCandidate({
  observationId,
  sourceRef,
  publishedAt,
  observedAt,
  claims = [],
  counterevidence = [],
  unknowns = [],
  relation = 'NEW',
  coverageStatus = 'OBSERVED',
}) {
  if (!observationId) throw new Error('観測候補IDが必要です');
  if (!sourceRef) throw new Error('元情報への参照が必要です');
  if (!RELATIONS.has(relation)) throw new Error('不正な関係種別です');
  if (!COVERAGE.has(coverageStatus)) throw new Error('不正な観測状態です');
  if (coverageStatus === 'OBSERVED' && claims.length === 0) {
    throw new Error('観測済み候補には少なくとも1つの主張が必要です');
  }

  return Object.freeze({
    kind: 'ICP_CANDIDATE',
    observationId,
    sourceRef,
    publishedAt,
    observedAt,
    claims: Object.freeze([...claims]),
    counterevidence: Object.freeze([...counterevidence]),
    unknowns: Object.freeze([...unknowns]),
    relation,
    coverageStatus,
  });
}

export function validateCandidate(candidate, {
  evidenceRefs = [],
  provenanceRefs = [],
  validationNotes = [],
} = {}) {
  if (candidate.kind !== 'ICP_CANDIDATE') {
    throw new Error('ICP候補以外は検証できません');
  }

  const errors = [];

  if (candidate.coverageStatus !== 'OBSERVED') {
    errors.push('観測済みデータではありません');
  }
  if (candidate.claims.length === 0) {
    errors.push('検証対象の主張がありません');
  }
  if (evidenceRefs.length === 0) {
    errors.push('根拠への参照がありません');
  }
  if (provenanceRefs.length === 0) {
    errors.push('出所への参照がありません');
  }

  return Object.freeze({
    candidateId: candidate.observationId,
    status: errors.length === 0 ? 'VALIDATED' : 'REJECTED',
    evidenceRefs: Object.freeze([...evidenceRefs]),
    provenanceRefs: Object.freeze([...provenanceRefs]),
    validationNotes: Object.freeze([...validationNotes]),
    errors: Object.freeze(errors),
  });
}

export function createPromotionEnvelope(candidate, validation) {
  if (candidate.kind !== 'ICP_CANDIDATE') {
    throw new Error('ICP候補以外は昇格できません');
  }
  if (validation.candidateId !== candidate.observationId) {
    throw new Error('候補と検証結果が一致しません');
  }
  if (validation.status !== 'VALIDATED') {
    throw new Error('検証済みでない候補は正式データ層へ昇格できません');
  }

  return Object.freeze({
    kind: 'PROMOTION_ENVELOPE',
    sourceCandidateId: candidate.observationId,
    sourceRef: candidate.sourceRef,
    publishedAt: candidate.publishedAt,
    observedAt: candidate.observedAt,
    claims: candidate.claims,
    counterevidence: candidate.counterevidence,
    unknowns: candidate.unknowns,
    relation: candidate.relation,
    evidenceRefs: validation.evidenceRefs,
    provenanceRefs: validation.provenanceRefs,
    promotionStatus: 'VALIDATED_FOR_IMPORT',
  });
}
