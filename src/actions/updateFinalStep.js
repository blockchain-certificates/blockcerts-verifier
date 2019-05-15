import * as ACTIONS from '../constants/actionTypes';

export default function updateFinalStep (finalStep) {
  return {
    type: ACTIONS.UPDATE_FINAL_STEP,
    payload: {
      finalStep
    }
  };
}
