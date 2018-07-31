export default function updateVerificationStatus (state, action) {
  return {
    ...state,
    verificationStatus: action.payload.status
  };
}
