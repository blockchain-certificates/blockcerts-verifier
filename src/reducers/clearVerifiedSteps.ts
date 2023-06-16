import type { BlockcertsVerifierState } from '../store/getInitialState';
import { Action } from '../actions/action';
import { ClearVerifiedStepsPayload } from '../actions/clearVerifiedSteps';

export default function clearVerifiedSteps (state: BlockcertsVerifierState, action: Action<ClearVerifiedStepsPayload>): BlockcertsVerifierState {
  const { resetSteps } = action.payload;

  return {
    ...state,
    verifiedSteps: resetSteps
  };
}
