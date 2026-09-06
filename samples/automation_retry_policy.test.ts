import test from 'node:test';
import assert from 'node:assert/strict';
import {
  assertRetryAllowed,
  decideRetryDisposition,
  isAiFallbackEligible,
} from './automation_retry_policy.ts';

test('submit may have occurred requires manual handling', () => {
  assert.equal(
    decideRetryDisposition('NETWORK_TRANSIENT', 'SUBMIT_MAY_HAVE_OCCURRED'),
    'MANUAL_REQUIRED',
  );
  assert.throws(() =>
    assertRetryAllowed('SUBMIT_MAY_HAVE_OCCURRED', 'SAFE_AUTOMATIC'),
  );
});

test('safe transient network failure can retry automatically', () => {
  assert.equal(
    decideRetryDisposition('NETWORK_TRANSIENT', 'SAFE_TO_RETRY'),
    'SAFE_AUTOMATIC',
  );
});

test('AI fallback eligibility is narrowly scoped', () => {
  assert.equal(isAiFallbackEligible('FORM_NOT_FOUND'), true);
  assert.equal(isAiFallbackEligible('FIELD_MAPPING_AMBIGUOUS'), true);
  assert.equal(isAiFallbackEligible('CAPTCHA_DETECTED'), false);
});
