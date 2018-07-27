import { getVerifiedSteps, getParentStep } from '../selectors/certificate';

function saveSubstepIn (parent, substep) {
  // does substep exist in parent yet?
  // TODO: // TODO: assess if should remove? substep should always be defined initially
  const substepIndex = parent.subSteps.findIndex(s => s.code === substep.code);

  if (substepIndex > -1) {
    parent.subSteps[substepIndex] = substep;
  } else {
    // TODO: assess if should remove? We should never get there.
    parent.subSteps.push(substep);
  }
}

export default function stepVerified (state, action) {
  const { parentStep } = action.payload;
  const storedParentState = getParentStep(state, parentStep);

  if (parentStep && storedParentState) {
    saveSubstepIn(storedParentState, action.payload);
  } else {
    // TODO: assess if should remove? We should never get there.
    getVerifiedSteps(state).push(action.payload);
  }

  return state;
}
