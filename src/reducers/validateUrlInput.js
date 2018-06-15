export default function validateUrlInput (state, action) {
  return {
    ...state,
    input: {
      ...state.input,
      isValid: action.payload.isValid
    }
  };
}
