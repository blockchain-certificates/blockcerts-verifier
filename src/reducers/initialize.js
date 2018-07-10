export default function initialize (state, action) {
  return {
    ...state,
    ...action.payload.options
  };
}
