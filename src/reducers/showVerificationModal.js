export default function showVerificationModal (state, action) {
  return {
    ...state,
    showVerificationModal: action.payload.showVerificationModal
  };
}
