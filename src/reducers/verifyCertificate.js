export default function verifyCertificate (state, action) {
  return {
    ...state,
    verificationStatus: action.payload.status
  };
}
