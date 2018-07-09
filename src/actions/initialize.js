import * as ACTIONS from '../constants/actionTypes';
import updateCertificateUrl from './updateCertificateUrl';

export default function initialize (options = {}) {
  return function (dispatch) {
    const { src, allowAutoVerify } = options;

    dispatch({
      type: ACTIONS.INITIALIZE,
      payload: {
        options: {
          allowAutoVerify
        }
      }
    });

    if (src) {
      dispatch(updateCertificateUrl(src));
    }
  }
}
