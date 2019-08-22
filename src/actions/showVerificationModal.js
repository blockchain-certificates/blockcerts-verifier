import * as ACTIONS from '../constants/actionTypes';

export default function showVerificationModal (show) {
  return {
    type: ACTIONS.SHOW_VERIFICATION_MODAL,
    payload: {
      showVerificationModal: show
    }
  };
}
