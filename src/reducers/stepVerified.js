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
  const { parentStep } = action.payload;
  const storedParentState = getParentStep(state, parentStep);

  console.log(action.payload);

  // if (parentStep && storedParentState) {
  //   saveSubstepIn(storedParentState, action.payload);
  // } else {
  //   getVerifiedSteps(state).push(action.payload);
  // }

  return state;
}
