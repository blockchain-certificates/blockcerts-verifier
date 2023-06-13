import { getParentStep } from '../selectors/certificate';
import type { BlockcertsVerifierState } from '../store/getInitialState';
import type { Action } from '../actions/action';
import type { UpdateParentStepStatusActionPayload } from '../actions/updateParentStepStatus';

export default function updateParentStepStatus (state: BlockcertsVerifierState, action: Action<UpdateParentStepStatusActionPayload>): BlockcertsVerifierState {
  const { parentStepCode, status } = action.payload;

  const parentStep = getParentStep(state, parentStepCode);

  parentStep.status = status; // TODO: better handle immutability

  return state;
}
