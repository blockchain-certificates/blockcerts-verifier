import { getParentStep } from '../selectors/certificate';
import { BlockcertsVerifierState } from '../store/getInitialState';
import { IVerificationMapItem, VerificationSubstep } from '@blockcerts/cert-verifier-js';

function updateSubstepIn (parent: IVerificationMapItem, substep: VerificationSubstep): void {
  let substepIndex = parent.subSteps.findIndex(s => s.code === substep.code);
  if (substepIndex > -1) {
    parent.subSteps[substepIndex] = substep;
    return;
  }
  if (parent.suites?.length) {
    parent.suites.forEach(suite => {
      substepIndex = suite.subSteps.findIndex(s => s.code === substep.code);
      if (substepIndex > -1) {
        suite.subSteps[substepIndex] = substep;
      }
    });
  }
}

// TODO: define action
export default function stepVerified (state: BlockcertsVerifierState, action: any): BlockcertsVerifierState {
  const { parentStep } = action.payload;
  const storedParentState = getParentStep(state, parentStep);
  updateSubstepIn(storedParentState, action.payload);

  return state;
}
