import * as ACTIONS from '../constants/actionTypes';
import updateCertificateUrl from './updateCertificateUrl';

export function app (state, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_CERTIFICATE_URL:
      return updateCertificateUrl(state, action);

    default:
      return state;
  }
}
