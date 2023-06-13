import type { BlockcertsVerifierState } from '../store/getInitialState';
import type { Action } from '../actions/action';
import type { UpdateFinalStepActionPayload } from '../actions/updateFinalStep';

export default function updateFinalStep (state: BlockcertsVerifierState, action: Action<UpdateFinalStepActionPayload>): BlockcertsVerifierState {
  return {
    ...state,
    finalStep: action.payload.finalStep
  };
}
