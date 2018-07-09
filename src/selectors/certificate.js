import * as VERIFICATION_STATUS from '../constants/verificationStatus';

export function getCertificateDefinition (state) {
  return state.certificateDefinition;
}

export function getVerifiedSteps (state) {
  return state.verifiedSteps || [];
}

export function getParentStep (state, parentStepCode) {
  return getVerifiedSteps(state).find(step => step.code === parentStepCode);
}

export function getStartedVerificationSteps (state) {
  const verifiedSteps = getVerifiedSteps(state);

  return verifiedSteps.filter(step => step.status !== VERIFICATION_STATUS.DEFAULT);
}
