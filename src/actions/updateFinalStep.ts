import * as ACTIONS from '../constants/actionTypes';
import type { IFinalStep } from '../store/getInitialState';
import type { Action } from './action';

export interface UpdateFinalStepActionPayload {
  finalStep: IFinalStep;
}

export default function updateFinalStep (finalStep: IFinalStep): Action<UpdateFinalStepActionPayload> {
  if (typeof finalStep === 'string') {
    finalStep = {
      label: finalStep,
      description: ''
    };
  }
  return {
    type: ACTIONS.UPDATE_FINAL_STEP,
    payload: {
      finalStep
    }
  };
}
