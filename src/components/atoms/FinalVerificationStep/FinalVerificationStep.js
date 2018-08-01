import { html } from '@polymer/lit-element';

export default function FinalVerificationStep ({ hasError = false, chain = '', transactionLink = '', isTestChain }) {
  if (hasError) {
    return;
  }

  // TODO: better handle this dynamic class (cf npm classnames)
  const titleClasses = [
    'buv-c-verification-step',
    'is-final',
    isTestChain ? 'is-test' : ''
  ].join(' ');

  const title = isTestChain ? 'This Mocknet credential passed all checks' : 'Verified';
  const details = isTestChain
    ? 'Mocknet credentials are used for test purposes only. They are not recorded on a blockchain, ' +
    'and they should not be considered verified Blockcerts.'
    : html`This is a valid ${chain} certificate.<br/>
      <a class='buv-o-link' href='${transactionLink}' hidden?='${!transactionLink}'>View transaction link</a>`;

  return html`
    <dt class$='${titleClasses}'>${title}</dt>
    <dd class='buv-c-verification-substep  buv-u-excluded-from-flow  buv-o-small-text'>
      ${details}
    </dd>
  `;
}
