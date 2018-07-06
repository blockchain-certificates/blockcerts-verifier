export default function setErrorMessage (state, action) {
  const { errorMessage } = action.payload;

  return {
    ...state,
    errorMessage
  };
}
