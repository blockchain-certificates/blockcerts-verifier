import * as ACTIONS from '../constants/actionTypes';
import updateParentStepStatus from './updateParentStepStatus';

export default function stepVerified (stepDefinition) {
  return function (dispatch, getState) {
    const state = getState();

    const parentStepCode = state.verifiedSteps.find(step => step.subSteps.some(substep => substep.code === stepDefinition.code)).code;

    const step = {
      ...stepDefinition,
      ...stepDefinition.errorMessage && {
        errorMessage: stepDefinition.errorMessage
      },
      parentStep: parentStepCode
    };

    dispatch({
      type: ACTIONS.STEP_VERIFIED,
      payload: step
    });

    dispatch(updateParentStepStatus(parentStepCode));
  };
}
