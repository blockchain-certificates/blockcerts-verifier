import * as ACTIONS from '../constants/actionTypes';

export default function (step) {
  return {
    type: ACTIONS.STEP_VERIFIED,
    payload: step
  };
}
