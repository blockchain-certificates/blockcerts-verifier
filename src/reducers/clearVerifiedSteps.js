import { mainSteps } from '../models/verificationSteps';
import domain from '../domain';

export default function clearVerifiedSteps (state, action) {
  const resetSteps = mainSteps.map(step => domain.verification.createStep(step));

  return {
    ...state,
    verifiedSteps: resetSteps
  }
}
