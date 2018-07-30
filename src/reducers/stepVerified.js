import { getParentStep } from '../selectors/certificate';

function updateSubstepIn (parent, substep) {
  const substepIndex = parent.subSteps.findIndex(s => s.code === substep.code);
  parent.subSteps[substepIndex] = substep;
}

export default function stepVerified (state, action) {
  const { parentStep } = action.payload;
  const storedParentState = getParentStep(state, parentStep);
  updateSubstepIn(storedParentState, action.payload);

  return state;
}
