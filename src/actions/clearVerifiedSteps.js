import * as ACTIONS from '../constants/actionTypes';
import { getCertificateDefinition } from '../selectors/certificate';

export default function () {
  return function (dispatch, getState) {
    const certificateDefinition = getCertificateDefinition(getState());
    let resetSteps = [];

    if (certificateDefinition) {
      resetSteps = JSON.parse(JSON.stringify(certificateDefinition.verificationSteps));
    }

    dispatch({
      type: ACTIONS.CLEAR_VERIFIED_STEPS,
      payload: {
        resetSteps
      }
    });
  };
}
