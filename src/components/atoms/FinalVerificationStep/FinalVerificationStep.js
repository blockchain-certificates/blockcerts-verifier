import { html } from '@polymer/lit-element';

export default function FinalVerificationStep ({ hasError = false, chain = '', transactionLink = '', isTestChain }) {
  if (hasError) {
    return;
  }

  // TODO: better handle this dynamic class (cf npm classnames)
  const classes = [
    'buv-c-verification-step',
    'is-final',
    isTestChain ? 'is-test' : ''
  ].join(' ');

  return html`
    <dt class$='${classes}'>Verified</dt>
    <dd class='buv-c-verification-substep  buv-u-excluded-from-flow  buv-o-small-text'>
      This is a valid ${chain} certificate.<br/>
      <a class='buv-o-link' href='${transactionLink}' hidden?='${!transactionLink}'>View transaction link</a>
    </dd>
  `;
}
