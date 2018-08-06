import * as ACTIONS from '../constants/actionTypes';
import updateParentStepStatus from './updateParentStepStatus';
import StepQueue from '../helpers/stepQueue';

let stepQueue = null;

function dispatchActionsFactory (dispatch) {
  return function dispatchActions (step) {
    dispatch({
      type: ACTIONS.STEP_VERIFIED,
      payload: step
    });

    dispatch(updateParentStepStatus(step.parentStep));
  }
}

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

    const dispatchActions = dispatchActionsFactory(dispatch);

    if (!stepQueue) {
      // init only once
      stepQueue = new StepQueue(dispatchActions);
    }

    stepQueue.push(step);
    stepQueue.execute();
  };
}
