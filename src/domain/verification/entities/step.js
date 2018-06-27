export default class Step {
  constructor ({ name, code }) {
    this.name = name;
    this.code = code;
    this.substeps = [];
  }

  addSubstep (substep) {
    this.substeps.push(substep);
  }

}