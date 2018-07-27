import { getVerifiedSteps, getParentStep } from '../selectors/certificate';

function saveSubstepIn (parent, substep) {
  // does substep exist in parent yet?
  const substepIndex = parent.subSteps.findIndex(s => s.code === substep.code);

  if (substepIndex > -1) {
    parent.subSteps[substepIndex] = substep;
  } else {
    parent.subSteps.push(substep);
  }
}

export default function stepVerified (state, action) {
  const { parentStep } = action.payload;
  const storedParentState = getParentStep(state, parentStep);

  console.log(getVerifiedSteps(state));

  console.warn(action.payload);

  // if (parentStep && storedParentState) {
  //   saveSubstepIn(storedParentState, action.payload);
  // } else {
  //   getVerifiedSteps(state).push(action.payload);
  // }

  return state;
}
