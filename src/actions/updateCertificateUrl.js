import * as ACTIONS from '../constants/actionTypes';

export default function updateCertificateUrl (url) {
  return {
    type: ACTIONS.UPDATE_CERTIFICATE_URL,
    payload: {
      url
    }
  };
}
