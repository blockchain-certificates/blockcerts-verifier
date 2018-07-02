export default function clearVerifiedSteps (state, action) {
  const { resetSteps } = action.payload;

  return {
    ...state,
    verifiedSteps: resetSteps
  };
}
