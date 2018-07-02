import { mainSteps } from '../models/verificationSteps';
import domain from '../domain';

export function initializeVerifiedSteps () {
  return mainSteps.map(step => domain.verification.createStep(step));
}

export default function getInitialState () {
  return {
    input: {},
    verifiedSteps: initializeVerifiedSteps()
  };
}
