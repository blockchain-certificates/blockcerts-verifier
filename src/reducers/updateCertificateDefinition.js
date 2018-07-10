export default function updateCertificateDefinition (state, action) {
  return {
    ...state,
    certificateDefinition: action.payload.definition,
    certificateMetaInformation: action.payload.metaInformation
  };
}
