import { VERIFICATION_STATUSES } from '@blockcerts/cert-verifier-js';
import { getVerifiedSteps } from './certificate';

export function getVerificationStatus (state): VERIFICATION_STATUSES {
  return state.verificationStatus;
}

export function getVerificationStatusForSuite (state, suiteType: string): VERIFICATION_STATUSES {
  const verificationSteps = getVerifiedSteps(state);
  const proofVerificationSteps = verificationSteps.find(step => step.code === 'proofVerification');
  const suite = proofVerificationSteps.suites?.find(suite => suite.proofType === suiteType);

  if (!suite) {
    return '' as VERIFICATION_STATUSES;
  }

  if (suite.subSteps.every(subStep => subStep.status === VERIFICATION_STATUSES.SUCCESS)) {
    return VERIFICATION_STATUSES.SUCCESS;
  }

  if (suite.subSteps.some(subStep => subStep.status === VERIFICATION_STATUSES.FAILURE)) {
    return VERIFICATION_STATUSES.FAILURE;
  }

  return '' as VERIFICATION_STATUSES;
}

export function getVerificationHasStarted (state): boolean {
  const status = getVerificationStatus(state);

  return status !== VERIFICATION_STATUSES.DEFAULT;
}

export function getShowVerificationModal (state): boolean {
  return state.showVerificationModal;
}
