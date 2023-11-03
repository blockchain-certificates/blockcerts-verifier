import type { BlockcertsVerifierState } from '../store/getInitialState';
import type { Action } from '../actions/action';
import type { ShowVerificationModalActionPayload } from '../actions/showVerificationModal';

export default function showVerificationModal (state: BlockcertsVerifierState, action: Action<ShowVerificationModalActionPayload>): BlockcertsVerifierState {
  return {
    ...state,
    showVerificationModal: action.payload.showVerificationModal
  };
}
