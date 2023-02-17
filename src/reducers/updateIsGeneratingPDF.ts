import { BlockcertsVerifierState } from '../store/getInitialState';

// TODO: define action
export default function updateIsGeneratingPDF (state: BlockcertsVerifierState, action: any): BlockcertsVerifierState {
  return {
    ...state,
    isGeneratingPDF: action.payload.isGeneratingPDF
  };
}
