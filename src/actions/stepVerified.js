import * as ACTIONS from '../constants/actionTypes';

export default function ({ stepCode, stepName, status }) {
  return {
    type: ACTIONS.STEP_VERIFIED,
    payload: {
      stepCode,
      stepName,
      status
    }
  };
}
