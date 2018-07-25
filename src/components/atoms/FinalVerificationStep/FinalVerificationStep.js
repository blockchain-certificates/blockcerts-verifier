import { html } from '@polymer/lit-element';

export default function FinalVerificationStep ({ hasError = false, chain = '', transactionLink = '' }) {
  if (hasError) {
    return;
  }

  return html`
    <dt class='buv-c-verification-step is-final'>Verified</dt>
    <dd class='buv-c-verification-substep  buv-u-excluded-from-flow  buv-o-small-text'>
      This is a valid ${chain} certificate.<br/>
      <a class='buv-o-link' href='${transactionLink}' hidden?='${!transactionLink}'>View transaction link</a>
    </dd>
  `;
}
