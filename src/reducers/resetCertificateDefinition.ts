import type { BlockcertsVerifierState } from '../store/getInitialState';
import type { Action } from '../actions/action';
import type { ResetCertificationDefinitionActionPayload } from '../actions/resetCertificateDefinition';

export default function resetCertificateDefinition (state: BlockcertsVerifierState, action: Action<ResetCertificationDefinitionActionPayload>): BlockcertsVerifierState {
  return {
    ...state,
    certificateDefinition: action.payload.definition
  };
}
