import { getParentStep } from '../selectors/certificate';
import type { BlockcertsVerifierState } from '../store/getInitialState';
import type { IVerificationMapItem, VerificationSubstep } from '@blockcerts/cert-verifier-js';
import type { Action } from '../actions/action';

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

export default function stepVerified (state: BlockcertsVerifierState, action: Action<VerificationSubstep>): BlockcertsVerifierState {
  const { parentStep } = action.payload;
  const storedParentState = getParentStep(state, parentStep);
  updateSubstepIn(storedParentState, action.payload);

  return state;
}
