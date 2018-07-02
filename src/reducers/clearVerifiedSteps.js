import { initializeVerifiedSteps } from '../store/getInitialState';

export default function clearVerifiedSteps (state, action) {
  const resetSteps = initializeVerifiedSteps();

  return {
    ...state,
    verifiedSteps: resetSteps
  }
}
