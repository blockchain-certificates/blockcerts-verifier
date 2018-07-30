import domain from '../domain';

export default function updateCertificateDefinition (state, action) {
  return {
    ...state,
    ...action.payload,
    ...action.payload.certificateDefinition && {
      verifiedSteps: domain.certificates.initializeVerificationSteps(action.payload.certificateDefinition)
    }
  };
}
