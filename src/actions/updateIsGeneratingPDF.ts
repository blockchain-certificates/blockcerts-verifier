import * as ACTIONS from '../constants/actionTypes';
import type { Action } from './action';

export interface UpdateIsGeneratingPDFActionPayload {
  isGeneratingPDF: boolean;
}

export default function updateIsGeneratingPDF (isGeneratingPDF: boolean): Action<UpdateIsGeneratingPDFActionPayload> {
  return {
    type: ACTIONS.UPDATE_IS_GENERATING_PDF,
    payload: {
      isGeneratingPDF
    }
  };
}
