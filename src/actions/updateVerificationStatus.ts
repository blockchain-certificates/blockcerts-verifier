import * as ACTIONS from '../constants/actionTypes';
import type { VERIFICATION_STATUSES } from '@blockcerts/cert-verifier-js';
import { Action } from './action';

export default function updateVerificationStatus (status: VERIFICATION_STATUSES): Action<{ status: VERIFICATION_STATUSES }> {
  return {
    type: ACTIONS.UPDATE_VERIFICATION_STATUS,
    payload: {
      status
    }
  };
}
