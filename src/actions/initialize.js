import * as ACTIONS from '../constants/actionTypes';
import updateCertificateUrl from './updateCertificateUrl';
import updateCertificateDefinition from './updateCertificateDefinition';
import { getAPIOptions } from '../models/API';

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
    if (APIOptions.certificate) {
      dispatch(updateCertificateDefinition(APIOptions.certificate));
    }
  };
}
