export default function updateCertificateUrl (url) {
  return {
    type: 'UPDATE_CERTIFICATE_URL',
    payload: {
      url
    }
  };
}
