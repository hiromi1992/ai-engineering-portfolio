export type JobCheckpoint =
  | 'NOT_STARTED'
  | 'SAFE_TO_RETRY'
  | 'SUBMIT_MAY_HAVE_OCCURRED'
  | 'COMPLETED';

export type RetryDisposition =
  | 'NOT_APPLICABLE'
  | 'SAFE_AUTOMATIC'
  | 'NO_AUTOMATIC'
  | 'MANUAL_REQUIRED';

export type FailureReason =
  | 'FORM_NOT_FOUND'
  | 'NETWORK_TRANSIENT'
  | 'ACCESS_FORBIDDEN'
  | 'FIELD_MAPPING_AMBIGUOUS'
  | 'CAPTCHA_DETECTED'
  | 'MANUAL_CONFIRMATION_REQUIRED'
  | 'INTERNAL_ERROR';

const AI_FALLBACK_CANDIDATES = new Set<FailureReason>([
  'FORM_NOT_FOUND',
  'FIELD_MAPPING_AMBIGUOUS',
]);

export function isAiFallbackEligible(reason: FailureReason): boolean {
  return AI_FALLBACK_CANDIDATES.has(reason);
}

export function assertRetryAllowed(
  checkpoint: JobCheckpoint,
  disposition: RetryDisposition,
): void {
  if (
    checkpoint === 'SUBMIT_MAY_HAVE_OCCURRED' &&
    disposition === 'SAFE_AUTOMATIC'
  ) {
    throw new Error(
      '送信済みの可能性があるため、自動再試行は許可できません',
    );
  }

  if (checkpoint === 'COMPLETED' && disposition !== 'NOT_APPLICABLE') {
    throw new Error('完了済みJobに再試行方針を設定できません');
  }
}

export function decideRetryDisposition(
  reason: FailureReason,
  checkpoint: JobCheckpoint,
): RetryDisposition {
  if (checkpoint === 'SUBMIT_MAY_HAVE_OCCURRED') {
    return 'MANUAL_REQUIRED';
  }

  if (reason === 'NETWORK_TRANSIENT' && checkpoint === 'SAFE_TO_RETRY') {
    return 'SAFE_AUTOMATIC';
  }

  if (
    reason === 'CAPTCHA_DETECTED' ||
    reason === 'MANUAL_CONFIRMATION_REQUIRED' ||
    reason === 'ACCESS_FORBIDDEN'
  ) {
    return 'MANUAL_REQUIRED';
  }

  return 'NO_AUTOMATIC';
}
