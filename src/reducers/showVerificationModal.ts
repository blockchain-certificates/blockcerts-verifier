import { BlockcertsVerifierState } from '../store/getInitialState';
import { Action } from '../actions/action';
import { ShowVerificationModalActionPayload } from '../actions/showVerificationModal';

export default function showVerificationModal (state: BlockcertsVerifierState, action: Action<ShowVerificationModalActionPayload>): BlockcertsVerifierState {
  return {
    ...state,
    showVerificationModal: action.payload.showVerificationModal
  };
}
