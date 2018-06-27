function getParentStep(state, parentStep) {
  return state.verifiedSteps.find(step => step.code === parentStep)
}

export default function stepVerified (state, action) {
  const { parentStep, stepCode, stepName, status } = action.payload;
  const storedParentState = getParentStep(state, parentStep);
  if (parentStep && storedParentState) {
    storedParentState.substeps.push({ stepCode, stepName, status })
  } else {
    state.verifiedSteps.push(action.payload);
  }

  return state;
}
