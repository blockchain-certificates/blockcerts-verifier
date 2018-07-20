export default function resetCertificateDefinition (state, action) {
  return {
    ...state,
    certificateDefinition: action.payload.definition
  };
}
