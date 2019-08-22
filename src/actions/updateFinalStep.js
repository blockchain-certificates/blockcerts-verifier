import * as ACTIONS from '../constants/actionTypes';

// TODO: move this responsibility to cert-verifier-js
export default function updateFinalStep (finalStep) {
  if (typeof finalStep === 'string') {
    finalStep = {
      label: finalStep
    };
  }
  return {
    type: ACTIONS.UPDATE_FINAL_STEP,
    payload: {
      finalStep
    }
  };
}
