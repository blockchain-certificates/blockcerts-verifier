import { html } from '@polymer/lit-element';
import CSS from './_components.final-verification-step-css';

function getDetails (finalStep, chain) {
  return finalStep.description
    // eslint-disable-next-line no-template-curly-in-string
    ? html`<p class='buv-c-verification-step__description  buv-qa-final-step-description'>${finalStep.description.replace('${chain}', chain)}</p>`
    : '';
}

export default function FinalVerificationStep ({
  chain = '',
  transactionLink = '',
  isTestChain,
  isVisible = false,
  finalStep = null,
  hideLink = false,
  status = false,
  standalone = false
} = {}) {
  if (!finalStep) {
    return;
  }

  const wrapperClasses = [
    standalone ? 'buv-c-final-verification-step--standalone-wrapper' : '',
    `is-${status}`,
    isTestChain ? 'is-test' : ''
  ].join(' ');

  // TODO: better handle this dynamic class (cf npm classnames)
  const titleClasses = [
    'buv-c-final-verification-step',
    'buv-qa-final-verification-step',
    standalone ? 'buv-c-final-verification-step--standalone' : '',
    'buv-qa-verification-step',
    isVisible ? 'is-visible' : '',
    isTestChain ? 'is-test' : '',
    `is-${status}`,
    status && !standalone ? 'buv-c-badge  buv-c-badge--large' : ''
  ].join(' ');

  const detailsClasses = [
    'buv-c-verification-substep',
    !standalone ? 'buv-u-excluded-from-flow' : '',
    'buv-u-full-width',
    'buv-o-text-12',
    'is-final',
    isVisible ? 'is-visible' : ''
  ].join(' ');

  const title = finalStep.label;
  const details = getDetails(finalStep, chain);
  const link = !hideLink && finalStep.linkText
    ? html`<a class='buv-o-link' href='${transactionLink}' hidden?='${!transactionLink}'>
        <span class='buv-o-link__text--underline  buv-qa-transaction-link'>${finalStep.linkText}</span>
      </a>`
    : '';

  return html`
    ${CSS}
    <div class$='${wrapperClasses}'>
      <dt class$='${titleClasses}'>${title}</dt>
      <dd class$='${detailsClasses}'>
        ${details}
        ${link}
      </dd>
      <slot></slot>
    </div>
  `;
}
