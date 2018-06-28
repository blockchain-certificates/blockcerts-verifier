import { getVerifiedSteps, getParentStep } from '../selectors/certificate';

function saveSubstepIn (parent, substep) {
  // does substep exist in parent yet?
  const substepIndex = parent.substeps.findIndex(s => s.code === substep.code);

  if (substepIndex > -1) {
    parent.substeps[substepIndex] = substep;
  } else {
    parent.substeps.push(substep);
  }
}

export default function stepVerified (state, action) {
  const { parentStep, code, name, status } = action.payload;
  const storedParentState = getParentStep(state, parentStep);

  if (parentStep && storedParentState) {
    saveSubstepIn(storedParentState, { code, name, status });
  } else {
    getVerifiedSteps(state).push(action.payload);
  }

  return state;
}
