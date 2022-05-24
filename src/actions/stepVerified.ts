import * as ACTIONS from '../constants/actionTypes';
import updateParentStepStatus from './updateParentStepStatus';
import stepQueueFactory from '../helpers/stepQueue';

const stepQueue = stepQueueFactory();

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

    console.log(stepDefinition.code);
    console.log(state.verifiedSteps);

    const parentStepCode = state.verifiedSteps.find(step => {
      console.log('looking in step', step);
      console.log('substeps', step.subSteps);
      console.log('suites', step.suites);
      console.log(step.suites?.subSteps);
      return step.subSteps.some(substep => substep.code === stepDefinition.code) ||
      step.suites?.some(suite => suite.subSteps?.some(substep => substep.code === stepDefinition.code));
    }
    ).code;

    console.log('found in parent', parentStepCode);

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
