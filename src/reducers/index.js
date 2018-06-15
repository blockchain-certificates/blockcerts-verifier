import * as ACTIONS from '../constants/actionTypes';
import updateCertificateUrl from './updateCertificateUrl';
import validateUrlInput from './validateUrlInput';

export function app (state, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_CERTIFICATE_URL:
      return updateCertificateUrl(state, action);

    case ACTIONS.VALIDATE_URL_INPUT:
      return validateUrlInput(state, action);

    default:
      return state;
  }
}
