import type { BlockcertsVerifierState } from '../store/getInitialState';
import type { Action } from '../actions/action';
import type { SetErrorMessageActionPayload } from '../actions/setErrorMessage';

export default function setErrorMessage (state: BlockcertsVerifierState, action: Action<SetErrorMessageActionPayload>): BlockcertsVerifierState {
  const { errorMessage, additionalErrorInfo } = action.payload;

  return {
    ...state,
    errorMessage,
    additionalErrorInfo
  };
}
