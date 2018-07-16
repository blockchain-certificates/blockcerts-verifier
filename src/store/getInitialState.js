import { mainSteps } from '../models/verificationSteps';
import * as DISPLAY_MODE from '../constants/displayMode';
import domain from '../domain';

export function initializeVerifiedSteps () {
  return mainSteps.map(step => domain.verification.createStep(step));
}

export default function getInitialState (apiConfiguration) {
  return {
    input: {},
    verifiedSteps: initializeVerifiedSteps(),
    displayMode: DISPLAY_MODE.CARD,
    ...apiConfiguration
  };
}
