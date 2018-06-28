import { getParentStep } from '../selectors/certificate';

export default function updateParentStepStatus (state, action) {
  const { parentStepCode, status } = action.payload;

  const parentStep = getParentStep(state, parentStepCode);

  parentStep.status = status;

  return state;
}
