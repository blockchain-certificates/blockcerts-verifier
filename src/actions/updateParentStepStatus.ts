import * as ACTIONS from '../constants/actionTypes';
import { getParentStep } from '../selectors/certificate';
import { VERIFICATION_STATUSES } from '@blockcerts/cert-verifier-js';
import type { ThunkAction } from 'redux-thunk';
import type { Action } from './action';
import type { IVerificationMapItem } from '@blockcerts/cert-verifier-js';

function stepVerificationIsSuccessful (step): boolean {
  return step.status === VERIFICATION_STATUSES.SUCCESS;
}

function stepVerificationIsFailure (step): boolean {
  return step.status === VERIFICATION_STATUSES.FAILURE;
}

function oneChildIsSuccess (parent: IVerificationMapItem): boolean {
  let suiteVerification = true;
  if (parent.suites?.length) {
    suiteVerification = parent.suites?.flatMap(suite => suite.subSteps).some(stepVerificationIsSuccessful);
  }
  return suiteVerification || parent.subSteps.some(stepVerificationIsSuccessful);
}

function allChildrenAreSuccess (parent: IVerificationMapItem): boolean {
  let suiteVerification = true;
  if (parent.suites?.length) {
    suiteVerification = parent.suites?.flatMap(suite => suite.subSteps).every(stepVerificationIsSuccessful);
  }
  return suiteVerification && parent.subSteps.every(stepVerificationIsSuccessful);
}

function oneChildIsFailure (parent: IVerificationMapItem): boolean {
  let suiteVerification = false;
  if (parent.suites?.length) {
    suiteVerification = parent.suites?.flatMap(suite => suite.subSteps).some(stepVerificationIsFailure);
  }
  return suiteVerification || parent.subSteps.some(stepVerificationIsFailure);
}

export default function updateParentStepStatus (parentStepCode: string): ThunkAction<void, any, void, Action<any>> {
  return function (dispatch, getState) {
    if (parentStepCode == null) {
      return;
    }

    const state = getState();

    const parent = getParentStep(state, parentStepCode);
    let status = parent.status;

    if (status === VERIFICATION_STATUSES.DEFAULT && oneChildIsSuccess(parent)) {
      status = VERIFICATION_STATUSES.STARTING;
    }

    if (status !== VERIFICATION_STATUSES.DEFAULT && allChildrenAreSuccess(parent)) {
      status = VERIFICATION_STATUSES.SUCCESS;
    }

    if (oneChildIsFailure(parent)) {
      status = VERIFICATION_STATUSES.FAILURE;
    }

    dispatch({
      type: ACTIONS.UPDATE_PARENT_STEP_STATUS,
      payload: {
        parentStepCode,
        status
      }
    });
  };
}
