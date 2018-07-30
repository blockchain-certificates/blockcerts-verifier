import * as VERIFICATION_STATUS from '../constants/verificationStatus';

function initializeVerifiedSteps (definition) {
  const steps = JSON.parse(JSON.stringify(definition.verificationSteps));
  return steps.map(step => ({
    ...step,
    status: VERIFICATION_STATUS.DEFAULT
  }));
}

export default function updateCertificateDefinition (state, action) {
  return {
    ...state,
    ...action.payload,
    ...action.payload.certificateDefinition && {
      verifiedSteps: initializeVerifiedSteps(action.payload.certificateDefinition)
    }
  };
}
