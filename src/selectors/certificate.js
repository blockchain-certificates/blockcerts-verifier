import * as VERIFICATION_STATUS from '../constants/verificationStatus';

export function getJSONCertificate (state) {
  return state.certificateDefinition;
}

export function getVerifiedSteps (state) {
  return state.verifiedSteps || [];
}

export function getParentStep (state, parentStep) {
  return getVerifiedSteps(state).find(step => step.code === parentStep);
}

export function getStartedVerificationSteps (state) {
  const verifiedSteps = getVerifiedSteps(state);

  return verifiedSteps.filter(step => step.status !== VERIFICATION_STATUS.DEFAULT);
}
