import * as ACTIONS from '../constants/actionTypes';
import clearVerifiedSteps from './clearVerifiedSteps';
import resetVerificationStatus from './resetVerificationStatus';
import type { ThunkAction } from 'redux-thunk';
import type { BlockcertsVerifierState } from '../store/getInitialState';
import type { Action } from './action';

export interface ResetCertificationDefinitionActionPayload {
  definition: null;
}

export default function resetCertificateDefinition (): ThunkAction<void, BlockcertsVerifierState, void, Action<ResetCertificationDefinitionActionPayload>> {
  return function (dispatch) {
    dispatch(clearVerifiedSteps());
    dispatch(resetVerificationStatus());

    dispatch({
      type: ACTIONS.RESET_CERTIFICATE_DEFINITION,
      payload: {
        definition: null
      }
    });
  };
}
