import * as ACTIONS from '../constants/actionTypes';
import { getParentStep } from '../selectors/certificate';
import * as VERIFICATION_STATUS from '../constants/verificationStatus';

function oneChildIsSuccess (parent) {
  return parent.substeps.some(s => s.status === VERIFICATION_STATUS.SUCCESS);
}

function allChildrenAreSuccess (parent) {
  return parent.substeps.every(s => s.status === VERIFICATION_STATUS.SUCCESS);
}

function oneChildIsFailure (parent) {
  return parent.substeps.some(s => s.status === VERIFICATION_STATUS.FAILURE);
}

export default function updateParentStepStatus (parentStepCode) {
  return function (dispatch, getState) {
    if (parentStepCode == null) {
      return;
    }

    const state = getState();

    const parent = getParentStep(state, parentStepCode);
    const parentStatus = parent.status;
    let status = parentStatus;

    if (parentStatus === VERIFICATION_STATUS.DEFAULT && oneChildIsSuccess(parent)) {
      status = VERIFICATION_STATUS.STARTED;
    }

    if (parentStatus !== VERIFICATION_STATUS.DEFAULT && allChildrenAreSuccess(parent)) {
      status = VERIFICATION_STATUS.SUCCESS;
    }

    if (oneChildIsFailure(parent)) {
      status = VERIFICATION_STATUS.FAILURE;
    }

    dispatch({
      type: ACTIONS.UPDATE_PARENT_STEP_STATUS,
      payload: {
        parentStepCode,
        status
      }
    })
  }
}
