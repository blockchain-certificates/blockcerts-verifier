import * as ACTIONS from '../constants/actionTypes';
import showVerificationModal from './showVerificationModal';
import verifyCertificate from './verifyCertificate';

export default function startVerificationProcess () {
  return function (dispatch) {
    dispatch({
      type: ACTIONS.START_VERIFICATION_PROCESS
    });

    dispatch(showVerificationModal(true));
    dispatch(verifyCertificate());
  };
}
