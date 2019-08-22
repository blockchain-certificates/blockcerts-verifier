import * as ACTIONS from '../constants/actionTypes';
import showVerificationModal from './showVerificationModal';
import verifyCertificate from './verifyCertificate';

export default function startVerificationProcess () {
  return function (dispatch, getState) {
    dispatch({
      type: ACTIONS.START_VERFICATION_PROCESS
    });

    dispatch(showVerificationModal(true));
    dispatch(verifyCertificate());
  };
}
