import * as ACTIONS from '../constants/actionTypes';
import updateParentStepStatus from './updateParentStepStatus';
import stepQueueFactory from '../helpers/stepQueue';
import type { IVerificationStepCallbackAPI } from '@blockcerts/cert-verifier-js';
import type { ThunkAction } from 'redux-thunk';
import type { Action } from './action';

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

export default function stepVerified (stepDefinition: IVerificationStepCallbackAPI): ThunkAction<void, any, void, Action<IVerificationStepCallbackAPI>> {
  return function (dispatch, getState) {
    const dispatchActions = dispatchActionsFactory(dispatch);
    if (!stepQueue.dispatchCb) {
      // register only once
      stepQueue.registerCb(dispatchActions);
    }
    stepQueue.push(stepDefinition);
    stepQueue.execute();
  };
}
