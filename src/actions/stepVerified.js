import * as ACTIONS from '../constants/actionTypes';
import updateParentStepStatus from './updateParentStepStatus';
import { getVerifiedSteps } from '../selectors/certificate';

let stepQueue = null;

class StepQueue {
  constructor (dispatchCb) {
    this.queue = [];
    this.dispatchCb = dispatchCb;
    this.isExecuting = false;
    this.intervalId = null;
    this.dispatchNext = this.dispatchNext.bind(this);
  }

  push (step) {
    this.queue.push(step);
  }

  dispatchNext () {
    const step = this.queue.shift();
    if (step) {
      this.dispatchCb(step);
    } else if (this.intervalId) {
      this.isExecuting = false;
      clearInterval(this.intervalId);
    }
  }

  execute () {
    if (!this.isExecuting && this.queue.length) {
      this.isExecuting = true;
      this.intervalId = setInterval(this.dispatchNext, 200)
    }
  }
}

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

    if (!stepQueue) {
      stepQueue = new StepQueue(dispatchActionsFactory(dispatch));
    }

    stepQueue.push(step);
    stepQueue.execute();
  };
}
