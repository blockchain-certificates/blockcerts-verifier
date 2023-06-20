import * as ACTIONS from '../constants/actionTypes';
import showVerificationModal from './showVerificationModal';
import verifyCertificate from './verifyCertificate';
import type { Dispatch } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { BlockcertsVerifierState } from '../store/getInitialState';
import type { Action } from './action';

export default function startVerificationProcess (): ThunkAction<void, BlockcertsVerifierState, any, Action<void>> {
  return function (dispatch: Dispatch): void {
    dispatch({
      type: ACTIONS.START_VERIFICATION_PROCESS
    });

    dispatch(showVerificationModal(true));
    dispatch(verifyCertificate() as any);
  };
}
