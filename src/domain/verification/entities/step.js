import { substepMap } from '../../../models/verificationSteps';
export const DEFAULT_STATUS = 'standby';

export default class Step {
  constructor ({ name, code, status }) {
    this.name = name;
    this.code = code;
    this.status = status || DEFAULT_STATUS;
    this.substeps = [];
    this.findParentStep();
  }

  findParentStep () {
    const mappedData = substepMap.find(m => m.code === this.code);
    if (mappedData && mappedData.parentStep) {
      this.parentStep = mappedData.parentStep;
    }
  }
}