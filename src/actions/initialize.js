import * as ACTIONS from '../constants/actionTypes';
import updateCertificateUrl from './updateCertificateUrl';

export default function initialize (options = {}) {
  return function (dispatch) {
    const { src, disableAutoVerify } = options;

    dispatch({
      type: ACTIONS.INITIALIZE,
      payload: {
        options: {
          disableAutoVerify
        }
      }
    });

    if (src) {
      dispatch(updateCertificateUrl(src));
    }
  };
}
