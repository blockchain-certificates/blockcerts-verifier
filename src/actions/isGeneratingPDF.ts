import * as ACTIONS from '../constants/actionTypes';
import { Action } from './action';

type TIsGeneratingPDF = {
  isGeneratingPDF: boolean;
};

export default function isGeneratingPDF (isGeneratingPDF: boolean): Action<TIsGeneratingPDF> {
  return {
    type: ACTIONS.UPDATE_IS_GENERATING_PDF,
    payload: {
      isGeneratingPDF
    }
  };
}
