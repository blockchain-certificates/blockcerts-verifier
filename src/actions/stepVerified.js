import * as ACTIONS from '../constants/actionTypes';
import updateParentStepStatus from './updateParentStepStatus';

export default function stepVerified (step) {
  return function (dispatch) {
    const { parentStep } = step;

    dispatch({
      type: ACTIONS.STEP_VERIFIED,
      payload: step
    });

    dispatch(updateParentStepStatus(parentStep));
  };
}
