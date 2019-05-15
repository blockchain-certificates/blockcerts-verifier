import { html } from '@polymer/lit-element';
import CSS from './_components.final-verification-step-css';

function getDetails (finalStep, chain) {
  return finalStep.description
    // eslint-disable-next-line no-template-curly-in-string
    ? html`<p class='buv-c-verification-step__description  buv-qa-final-step-description'>${finalStep.description.replace('${chain}', chain)}</p>`
    : '';
}

export default function FinalVerificationStep ({ chain = '', transactionLink = '', isTestChain, isVisible = false, finalStep = {} } = {}) {
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

  const title = finalStep.label;
  const details = getDetails(finalStep, chain);
  const link = finalStep.linkText
    ? html`<a class='buv-o-link' href='${transactionLink}' hidden?='${!transactionLink}'>
        <span class='buv-o-link__text--underline  buv-qa-transaction-link'>${finalStep.linkText}</span>
      </a>`
    : '';

  return html`
    ${CSS}
    <dt class$='${titleClasses}'>${title}</dt>
    <dd class$='${detailsClasses}'>
      ${details}
      ${link}
    </dd>
  `;
}
