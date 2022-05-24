import { VERIFICATION_STATUSES } from '@blockcerts/cert-verifier-js';

export function getVerificationStatus (state) {
  return state.verificationStatus;
}

export function getVerificationHasStarted (state) {
  const status = getVerificationStatus(state);

  return status !== VERIFICATION_STATUSES.DEFAULT;
}

export function getShowVerificationModal (state) {
  return state.showVerificationModal;
}
