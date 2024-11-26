import { html } from '@polymer/lit-element';
import CSS from './_components.final-verification-step-css';
import type { TemplateResult } from 'lit-html';
import type { IFinalStep } from '../../../store/getInitialState';

function getDetails (finalStep: IFinalStep, chain: string[]): TemplateResult {
  return finalStep.description
    // eslint-disable-next-line no-template-curly-in-string
    ? html`<p class='buv-c-verification-step__description  buv-qa-final-step-description'>${finalStep.description.replace('${chain}', chain[0])}</p>`
    : null;
}

export interface FinalVerificationStepProps {
  chain?: string[];
  transactionLink?: string[];
  isTestChain?: boolean;
  isVisible?: boolean;
  isOverlay?: boolean;
  finalStep?: IFinalStep;
  hideLink?: boolean;
  status?: string;
  standalone?: boolean;
}

export default function FinalVerificationStep ({
  chain = [''],
  transactionLink = [''],
  isTestChain = false,
  isVisible = false,
  finalStep = null,
  hideLink = false,
  status = '',
  standalone = false,
  isOverlay = false
}: FinalVerificationStepProps = {}): TemplateResult {
  if (!finalStep) {
    return;
  }

  const wrapperClasses: string = [
    standalone ? 'buv-c-final-verification-step--standalone-wrapper' : '',
    `is-${status}`,
    isTestChain ? 'is-test' : '',
    isOverlay ? 'buv-c-final-verification-step--overlay' : ''
  ].join(' ');

  // TODO: better handle this dynamic class (cf npm classnames)
  const titleClasses: string = [
    'buv-c-final-verification-step',
    'buv-qa-final-verification-step',
    standalone ? 'buv-c-final-verification-step--standalone' : '',
    'buv-qa-verification-step',
    isVisible ? 'is-visible' : '',
    isTestChain ? 'is-test' : '',
    isOverlay ? 'is-overlay' : '',
    `is-${status}`,
    status && !standalone ? 'buv-c-badge  buv-c-badge--large' : ''
  ].join(' ');

  const detailsClasses: string = [
    'buv-c-verification-substep',
    !standalone ? 'buv-u-excluded-from-flow' : '',
    'buv-u-full-width',
    'buv-o-text-12',
    'is-final',
    isVisible ? 'is-visible' : '',
    isOverlay ? 'is-overlay' : ''
  ].join(' ');

  const title = finalStep.label;
  const details = getDetails(finalStep, chain);
  const link = !hideLink && finalStep.linkText
    ? html`<a class='buv-o-link' href='${transactionLink[0]}' hidden?='${!transactionLink[0]}'>
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
