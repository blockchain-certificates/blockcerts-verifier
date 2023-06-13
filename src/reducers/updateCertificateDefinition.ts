import domain from '../domain';
import type { BlockcertsVerifierState } from '../store/getInitialState';
import type { Action } from '../actions/action';
import type { UpdateCertificateDefinitionActionPayload } from '../actions/updateCertificateDefinition';

export default function updateCertificateDefinition (state: BlockcertsVerifierState, action: Action<UpdateCertificateDefinitionActionPayload>): BlockcertsVerifierState {
  return {
    ...state,
    ...action.payload,
    ...action.payload.certificateDefinition && {
      verifiedSteps: domain.certificates.initializeVerificationSteps(action.payload.certificateDefinition)
    }
  };
}
