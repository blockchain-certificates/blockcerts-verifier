import { html } from '@polymer/lit-element';
import * as VERIFICATION_STATUS from '../../../constants/verificationStatus';

export default function FinalVerificationStep ({ status, chain = '' }) {
  if (status === VERIFICATION_STATUS.FAILURE) {
    return;
  }

  return html`
    <dt class='buv-c-verification-step is-final'>Verified: ${status}</dt>
    <dd class='buv-c-verification-substep'>This is a valid ${chain} certificate</dd>
  `;
}
