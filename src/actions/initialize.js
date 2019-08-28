import * as ACTIONS from '../constants/actionTypes';
import updateCertificateUrl from './updateCertificateUrl';
import { getAPIOptions } from '../models/API';
import setLocale from '../i18n/setLocale';

export default function initialize (options = {}) {
  return function (dispatch) {
    const APIOptions = getAPIOptions(options);

    dispatch({
      type: ACTIONS.INITIALIZE,
      payload: {
        options: APIOptions
      }
    });

    if (APIOptions.src) {
      dispatch(updateCertificateUrl(APIOptions.src));
    }

    setLocale(APIOptions.locale);
  };
}
