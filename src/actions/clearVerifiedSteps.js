import * as ACTIONS from '../constants/actionTypes';
import { initializeVerifiedSteps } from '../store/getInitialState';

export default function () {
  const resetSteps = initializeVerifiedSteps();

  return {
    type: ACTIONS.CLEAR_VERIFIED_STEPS,
    payload: {
      resetSteps
    }
  }
}
