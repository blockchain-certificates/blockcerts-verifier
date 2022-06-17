export default function updateIsGeneratingPDF (state, action) {
  return {
    ...state,
    isGeneratingPDF: action.payload.isGeneratingPDF
  };
}
