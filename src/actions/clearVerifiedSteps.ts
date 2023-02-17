import * as ACTIONS from '../constants/actionTypes';
import { getCertificateDefinition } from '../selectors/certificate';
import domain from '../domain';
import { Dispatch } from 'redux';
import { BlockcertsVerifierState } from '../store/getInitialState';

export default function () {
  return function (dispatch: Dispatch, getState: () => BlockcertsVerifierState): void {
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
