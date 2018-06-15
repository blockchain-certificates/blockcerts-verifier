export default function updateCertificateUrl (state, action) {
  return {
    ...state,
    input: {
      ...state.input,
      certificateUrl: action.payload.url
    }
  };
}
