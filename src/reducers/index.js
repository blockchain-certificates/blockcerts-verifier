import * as ACTIONS from '../constants/actionTypes';
import updateCertificateUrl from './updateCertificateUrl';
import validateUrlInput from './validateUrlInput';
import updateCertificateDefinition from './updateCertificateDefinition';
import stepVerified from './stepVerified';
import updateParentStepStatus from './updateParentStepStatus';
import clearVerifiedSteps from './clearVerifiedSteps';
import setErrorMessage from './setErrorMessage';
import initialize from './initialize';
import resetCertificateDefinition from './resetCertificateDefinition';
import updateVerificationStatus from './updateVerificationStatus';
import updateFinalStep from './updateFinalStep';

export function app (state, action) {
  switch (action.type) {
    case ACTIONS.CLEAR_VERIFIED_STEPS:
      return clearVerifiedSteps(state, action);

    case ACTIONS.INITIALIZE:
      return initialize(state, action);

    case ACTIONS.UPDATE_CERTIFICATE_DEFINITION:
      return updateCertificateDefinition(state, action);

    case ACTIONS.RESET_CERTIFICATE_DEFINITION:
      return resetCertificateDefinition(state, action);

    case ACTIONS.UPDATE_CERTIFICATE_URL:
      return updateCertificateUrl(state, action);

    case ACTIONS.UPDATE_PARENT_STEP_STATUS:
      return updateParentStepStatus(state, action);

    case ACTIONS.VALIDATE_URL_INPUT:
      return validateUrlInput(state, action);

    case ACTIONS.SET_ERROR_MESSAGE:
      return setErrorMessage(state, action);

    case ACTIONS.STEP_VERIFIED:
      return stepVerified(state, action);

    case ACTIONS.UPDATE_VERIFICATION_STATUS:
      return updateVerificationStatus(state, action);

    case ACTIONS.UPDATE_FINAL_STEP:
      return updateFinalStep(state, action);

    default:
      return state;
  }
}
