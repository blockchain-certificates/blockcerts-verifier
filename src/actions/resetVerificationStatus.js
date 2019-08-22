import * as ACTIONS from '../constants/actionTypes';
import updateVerificationStatus from './updateVerificationStatus';
import VERIFICATION_STATUS from '../constants/verificationStatus';
import updateFinalStep from './updateFinalStep';

export default function resetVerificationStatus () {
  return function (dispatch) {
    dispatch({
      type: ACTIONS.RESET_VERIFICATION_STATUS
    });

    dispatch(updateVerificationStatus(VERIFICATION_STATUS.DEFAULT));
    dispatch(updateFinalStep(null));
  };
}
