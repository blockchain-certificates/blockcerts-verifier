import * as ACTIONS from '../constants/actionTypes';
import { getCertificateDefinition } from '../selectors/certificate';
import domain from '../domain';
import { Dispatch } from 'redux';
import type { BlockcertsVerifierState } from '../store/getInitialState';
import type { IVerificationMapItem } from '@blockcerts/cert-verifier-js';
import type { ThunkAction } from 'redux-thunk';
import type { Action } from './action';

export interface ClearVerifiedStepsPayload {
  resetSteps: IVerificationMapItem[];
}

export default function clearVerifiedSteps (): ThunkAction<void, BlockcertsVerifierState, void, Action<ClearVerifiedStepsPayload>> {
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
