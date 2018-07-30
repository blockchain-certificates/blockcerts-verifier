import * as VERIFICATION_STATUS from '../../../constants/verificationStatus';

export default class Step {
  constructor ({ label, code, status, errorMessage, parentStep }) {
    this.label = label;
    this.code = code;
    this.status = status || VERIFICATION_STATUS.DEFAULT;
    this.setErrorMessage(errorMessage);
    this.parentStep = parentStep;
  }

  setErrorMessage (message) {
    if (message == null) {
      return;
    }

    this.errorMessage = message;
  }
}
