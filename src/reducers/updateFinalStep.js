export default function updateFinalStep (state, action) {
  return {
    ...state,
    finalStep: action.payload.finalStep
  };
}
