export const DEFAULT_STATUS = 'standby';

export default class Step {
  constructor ({ name, code, status }) {
    this.name = name;
    this.code = code;
    this.substeps = [];
    this.status = status || DEFAULT_STATUS
  }

  addSubstep (substep) {
    this.substeps.push(substep);
  }

}