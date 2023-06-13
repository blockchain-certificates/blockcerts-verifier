import * as ACTIONS from '../constants/actionTypes';
import type { VERIFICATION_STATUSES } from '@blockcerts/cert-verifier-js';
import type { Action } from './action';

export interface UpdateVerificationStatusActionPayload {
  status: VERIFICATION_STATUSES;
}

export default function updateVerificationStatus (status: VERIFICATION_STATUSES): Action<UpdateVerificationStatusActionPayload> {
  return {
    type: ACTIONS.UPDATE_VERIFICATION_STATUS,
    payload: {
      status
    }
  };
}
