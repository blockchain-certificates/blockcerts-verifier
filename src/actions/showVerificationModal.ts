import * as ACTIONS from '../constants/actionTypes';
import type { Action } from './action';

export interface ShowVerificationModalActionPayload {
  showVerificationModal: boolean;
}

export default function showVerificationModal (show: boolean): Action<ShowVerificationModalActionPayload> {
  return {
    type: ACTIONS.SHOW_VERIFICATION_MODAL,
    payload: {
      showVerificationModal: show
    }
  };
}
