import { createHash } from 'node:crypto';

const sha256 = value => createHash('sha256').update(value).digest('hex');

export function createEvidence({ signalId, artifact, quote }) {
  const start = artifact.text.indexOf(quote);
  if (start < 0) throw new Error('引用箇所が取得済み本文に存在しません');

  const actualHash = sha256(artifact.text);
  if (actualHash !== artifact.textSha256) {
    throw new Error('取得済み本文のハッシュが一致しません');
  }

  const identity = {
    signalId,
    artifactRef: artifact.ref,
    textSha256: artifact.textSha256,
    locator: { start, end: start + quote.length },
    value: quote,
  };

  return Object.freeze({
    evidenceId: sha256(JSON.stringify(identity)),
    ...identity,
  });
}

export function verifyEvidence(evidence, artifact) {
  if (!artifact) {
    return { status: 'ARTIFACT_MISSING', resolvedValue: null };
  }

  const actualHash = sha256(artifact.text);
  if (
    artifact.ref !== evidence.artifactRef ||
    artifact.textSha256 !== evidence.textSha256 ||
    actualHash !== evidence.textSha256
  ) {
    return { status: 'HASH_MISMATCH', resolvedValue: null };
  }

  const { start, end } = evidence.locator;
  if (start < 0 || end <= start || end > artifact.text.length) {
    return { status: 'LOCATOR_MISMATCH', resolvedValue: null };
  }

  const resolvedValue = artifact.text.slice(start, end);
  return {
    status: resolvedValue === evidence.value ? 'VERIFIED' : 'LOCATOR_MISMATCH',
    resolvedValue,
  };
}

export function replayEvidence({ evidenceRecords, artifacts }) {
  const artifactsByRef = new Map(artifacts.map(item => [item.ref, item]));

  return {
    networkAttempted: false,
    results: evidenceRecords.map(evidence => ({
      evidenceId: evidence.evidenceId,
      ...verifyEvidence(evidence, artifactsByRef.get(evidence.artifactRef)),
    })),
  };
}
