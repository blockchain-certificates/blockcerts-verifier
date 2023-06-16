import type { BlockcertsVerifierState } from '../store/getInitialState';
import type { Action } from '../actions/action';
import type { ValidateUrlInputActionPayload } from '../actions/validateUrlInput';

export default function validateUrlInput (state: BlockcertsVerifierState, action: Action<ValidateUrlInputActionPayload>): BlockcertsVerifierState {
  return {
    ...state,
    input: {
      ...state.input,
      isValid: action.payload.isValid
    }
  };
}
