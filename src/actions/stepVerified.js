import * as ACTIONS from '../constants/actionTypes';

export default function ({ code, name, status, parentStep }) {
  return {
    type: ACTIONS.STEP_VERIFIED,
    payload: {
      stepCode: code,
      stepName: name,
      status,
      parentStep
    }
  };
}
