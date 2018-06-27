import { getVerifiedSteps, getParentStep } from '../selectors/certificate';

export default function stepVerified (state, action) {
  const { parentStep, code, name, status } = action.payload;
  const storedParentState = getParentStep(state, parentStep);
  if (parentStep && storedParentState) {
    storedParentState.substeps.push({ code, name, status });
  } else {
    getVerifiedSteps(state).push(action.payload);
  }

  return state;
}
