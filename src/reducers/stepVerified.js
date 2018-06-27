export default function stepVerified (state, action) {
  if (!state.verifiedSteps) {
    state.verifiedSteps = [];
  }

  state.verifiedSteps.push(action.payload);

  return state;
}
