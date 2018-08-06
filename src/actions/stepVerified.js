import * as ACTIONS from '../constants/actionTypes';
import updateParentStepStatus from './updateParentStepStatus';
import stepQueueFactory from '../helpers/stepQueue';

let stepQueue = stepQueueFactory();

function dispatchActionsFactory (dispatch) {
  return function dispatchActions (step) {
    dispatch({
      type: ACTIONS.STEP_VERIFIED,
      payload: step
    });

    dispatch(updateParentStepStatus(step.parentStep));
  };
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

    if (!stepQueue.dispatchCb) {
      // register only once
      stepQueue.registerCb(dispatchActions);
    }
    stepQueue.push(step);
    stepQueue.execute();
  };
}
