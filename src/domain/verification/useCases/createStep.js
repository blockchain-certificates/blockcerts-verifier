import { Step } from '../entities';

export default function createStep (stepDefinition) {
  return new Step(stepDefinition);
}
