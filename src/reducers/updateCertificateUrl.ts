import type { BlockcertsVerifierState } from '../store/getInitialState';
import type { Action } from '../actions/action';
import type { UpdateCertificateUrlActionPayload } from '../actions/updateCertificateUrl';

export default function updateCertificateUrl (state: BlockcertsVerifierState, action: Action<UpdateCertificateUrlActionPayload>): BlockcertsVerifierState {
  return {
    ...state,
    input: {
      ...state.input,
      certificateUrl: action.payload.url
    }
  };
}
