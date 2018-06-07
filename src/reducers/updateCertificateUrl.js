export default function updateCertificateUrl (state, action) {
  return {
    ...state,
    certificateUrl: action.payload.url
  }
}
