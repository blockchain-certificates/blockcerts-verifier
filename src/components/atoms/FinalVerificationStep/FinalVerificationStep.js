import { html } from '@polymer/lit-element';
import CSS from './_components.final-verification-step-css';

export default function FinalVerificationStep ({ chain = '', transactionLink = '', isTestChain, isVisible = false }) {
  // TODO: better handle this dynamic class (cf npm classnames)
  const titleClasses = [
    'buv-c-verification-step',
    'buv-qa-verification-step',
    'is-final',
    isVisible ? 'is-visible' : '',
    isTestChain ? 'is-test' : ''
  ].join(' ');

  const detailsClasses = [
    'buv-c-verification-substep',
    'buv-u-excluded-from-flow',
    'buv-u-full-width',
    'buv-o-text-12',
    'is-final',
    isVisible ? 'is-visible' : ''
  ].join(' ');

  const title = isTestChain ? 'This Mocknet credential passed all checks' : 'Verified';
  const details = isTestChain
    ? 'Mocknet credentials are used for test purposes only. They are not recorded on a blockchain, ' +
    'and they should not be considered verified Blockcerts.'
    : html`This is a valid ${chain} certificate.<br/>
      <a class='buv-o-link' href='${transactionLink}' hidden?='${!transactionLink}'>
        <span class='buv-o-link__text--underline'>View transaction link</span>
      </a>`;

  return html`
    ${CSS}
    <dt class$='${titleClasses}'>${title}</dt>
    <dd class$='${detailsClasses}'>
      ${details}
    </dd>
  `;
}
