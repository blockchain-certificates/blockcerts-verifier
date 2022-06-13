import { getParentStep } from '../selectors/certificate';

function updateSubstepIn (parent, substep) {
  let substepIndex = parent.subSteps.findIndex(s => s.code === substep.code);
  if (substepIndex > -1) {
    parent.subSteps[substepIndex] = substep;
    return;
  }
  if (parent.suites?.length) {
    parent.suites.forEach(suite => {
      substepIndex = suite.subSteps.findIndex(s => s.code === substep.code);
      if (substepIndex > -1) {
        suite.subSteps[substepIndex] = substep;
      }
    });
  }
}

export default function stepVerified (state, action) {
  const { parentStep } = action.payload;
  const storedParentState = getParentStep(state, parentStep);
  updateSubstepIn(storedParentState, action.payload);

  return state;
}
