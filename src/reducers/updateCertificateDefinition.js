export default function updateCertificateDefinition (state, action) {
  return {
    ...state,
    ...action.payload
  };
}
