export function getCertificateUrl (state) {
  return state.input.certificateUrl;
}

export function getUrlIsValid (state) {
  if (typeof state.input.isValid === 'undefined') {
    return true;
  }
  return state.input.isValid;
}
