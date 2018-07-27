export default function updateCertificateDefinition (state, action) {
  return {
    ...state,
    ...action.payload,
    ...action.payload.certificateDefinition && {
      verifiedSteps: JSON.parse(JSON.stringify(action.payload.certificateDefinition.verificationSteps))
    }
  };
}
