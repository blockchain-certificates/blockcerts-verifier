import * as ACTIONS from '../constants/actionTypes';
import { getCertificateDefinition } from '../selectors/certificate';
import domain from '../domain';

export default function () {
  return function (dispatch, getState) {
    const certificateDefinition = getCertificateDefinition(getState());
    let resetSteps = [];

    if (certificateDefinition) {
      resetSteps = domain.certificates.initializeVerificationSteps(certificateDefinition);
    }

    dispatch({
      type: ACTIONS.CLEAR_VERIFIED_STEPS,
      payload: {
        resetSteps
      }
    });
  };
}
