import { substepMap } from '../../../models/verificationSteps';
import * as VERIFICATION_STATUS from '../../../constants/verificationStatus';

export default class Step {
  constructor ({ label, code, status, errorMessage }) {
    this.label = label;
    this.code = code;
    this.status = status || VERIFICATION_STATUS.DEFAULT;
    this.subSteps = [];
    this.setErrorMessage(errorMessage);
    this.findParentStep();
  }

  findParentStep () {
    const mappedData = substepMap.find(m => m.code === this.code);
    if (mappedData && mappedData.parentStep) {
      this.parentStep = mappedData.parentStep;
    }
  }

  setErrorMessage (message) {
    if (message == null) {
      return;
    }

    this.errorMessage = message;
  }
}
