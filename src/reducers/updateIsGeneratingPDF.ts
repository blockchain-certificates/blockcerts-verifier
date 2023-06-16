import type { BlockcertsVerifierState } from '../store/getInitialState';
import type { Action } from '../actions/action';
import type { UpdateIsGeneratingPDFActionPayload } from '../actions/updateIsGeneratingPDF';

export default function updateIsGeneratingPDF (state: BlockcertsVerifierState, action: Action<UpdateIsGeneratingPDFActionPayload>): BlockcertsVerifierState {
  return {
    ...state,
    isGeneratingPDF: action.payload.isGeneratingPDF
  };
}
