import * as ACTIONS from '../constants/actionTypes';
import updateVerificationStatus from './updateVerificationStatus';
import updateFinalStep from './updateFinalStep';
import { VERIFICATION_STATUSES } from '@blockcerts/cert-verifier-js'; // TODO: kill this import
import type { Dispatch } from 'redux';

export default function resetVerificationStatus () {
  return function (dispatch: Dispatch): void {
    dispatch({
      type: ACTIONS.RESET_VERIFICATION_STATUS
    });

    dispatch(updateVerificationStatus(VERIFICATION_STATUSES.DEFAULT));
    dispatch(updateFinalStep(null));
  };
}
