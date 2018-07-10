import { html } from '@polymer/lit-element';
import * as VERIFICATION_STATUS from '../../../constants/verificationStatus';

export default function FinalVerificationStep ({ status, chain = '', transactionLink = '' }) {
  if (status === VERIFICATION_STATUS.FAILURE) {
    return;
  }

  return html`
    <dt class='buv-c-verification-step is-final'>Verified</dt>
    <dd class='buv-c-verification-substep buv-u-excluded-from-flow'>
      This is a valid ${chain} certificate.<br/>
      <a href='${transactionLink}' hidden?='${!transactionLink}'>View transaction link</a>
    </dd>
  `;
}
