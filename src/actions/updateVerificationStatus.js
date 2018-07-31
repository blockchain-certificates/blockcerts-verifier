import * as ACTIONS from '../constants/actionTypes';

export default function updateVerificationStatus (status) {
  return {
    type: ACTIONS.UPDATE_VERIFICATION_STATUS,
    payload: {
      status
    }
  };
}
