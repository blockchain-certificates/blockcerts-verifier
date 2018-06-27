export function getJSONCertificate (state) {
  return state.certificateDefinition;
}

export function getVerifiedSteps (state) {
  return state.verifiedSteps;
}

export function getParentStep (state, parentStep) {
  return getVerifiedSteps(state).find(step => step.code === parentStep)
}
