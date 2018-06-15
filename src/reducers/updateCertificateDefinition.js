export default function updateCertificateUrl (state, action) {
  return {
    ...state,
    certificateDefinition: action.payload.definition
  };
}
