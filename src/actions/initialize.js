import * as ACTIONS from '../constants/actionTypes';
import updateCertificateUrl from './updateCertificateUrl';

export default function initialize (options = {}) {
  return function (dispatch) {
    dispatch({
      type: ACTIONS.INITIALIZE,
      payload: {
        options
      }
    });

    if (options.src) {
      dispatch(updateCertificateUrl(options.src));
    }
  }
}
