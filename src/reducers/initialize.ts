import type { BlockcertsVerifierState } from '../store/getInitialState';
import type { Action } from '../actions/action';
import type { InitializeActionPayload } from '../actions/initialize';

export default function initialize (state: BlockcertsVerifierState, action: Action<InitializeActionPayload>): BlockcertsVerifierState {
  return {
    ...state,
    ...action.payload.options
  };
}
