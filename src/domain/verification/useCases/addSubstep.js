import { Step } from '../entities';

function isStep (step) {
  return step instanceof Step;
}

export default function addSubstep (parent, substep) {
  // where is your typescript now?
  if (!isStep(parent)) {
    throw new Error('Cannot add substep to non Step object');
  }

  if (!isStep(substep)) {
    throw new Error('substep is not a Step object');
  }

  parent.addSubstep(substep);
}