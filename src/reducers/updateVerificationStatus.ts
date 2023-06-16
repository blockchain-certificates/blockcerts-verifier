import type { BlockcertsVerifierState } from '../store/getInitialState';
import type { Action } from '../actions/action';
import type { UpdateVerificationStatusActionPayload } from '../actions/updateVerificationStatus';

export default function updateVerificationStatus (state: BlockcertsVerifierState, action: Action<UpdateVerificationStatusActionPayload>): BlockcertsVerifierState {
  return {
    ...state,
    verificationStatus: action.payload.status
  };
}
