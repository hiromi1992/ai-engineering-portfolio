import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createEvidence, replayEvidence, verifyEvidence } from './evidence_verification.js';

const hash = value => createHash('sha256').update(value).digest('hex');
const text = 'Alpha evidence sentence.\nSecond line.';
const artifact = {
  ref: 'artifact:test:1',
  text,
  textSha256: hash(text),
};

test('取得済み本文の引用位置とハッシュから証拠を作れる', () => {
  const evidence = createEvidence({ signalId: 'signal-1', artifact, quote: 'evidence sentence' });
  assert.equal(verifyEvidence(evidence, artifact).status, 'VERIFIED');
});

test('本文の改ざんを検知する', () => {
  const evidence = createEvidence({ signalId: 'signal-1', artifact, quote: 'Alpha' });
  assert.equal(verifyEvidence(evidence, { ...artifact, text: 'tampered' }).status, 'HASH_MISMATCH');
});

test('再検証ではネットワークへ再アクセスしない', () => {
  const evidence = createEvidence({ signalId: 'signal-1', artifact, quote: 'Alpha' });
  const replay = replayEvidence({ evidenceRecords: [evidence], artifacts: [artifact] });
  assert.equal(replay.networkAttempted, false);
  assert.equal(replay.results[0].status, 'VERIFIED');
});
