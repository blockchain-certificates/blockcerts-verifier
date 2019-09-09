import { html } from '@polymer/lit-element';
import CSS from './_components.verification-step-css';
import ErrorMessage from '../../atoms/ErrorMessage';

export default function VerificationStep ({ label, code, status, errorMessage, isParent, isFirst, isTestChain }) {
  // TODO: better handle this dynamic class (cf npm classnames)
  const parentStepClasses = [
    'buv-o-text-15',
    'buv-c-verification-step',
    'buv-c-badge',
    isFirst ? 'is-first' : '',
    `is-${status}`,
    isTestChain ? 'is-test' : ''
  ].join(' ');

  let innerHTML;
  if (isParent) {
    innerHTML = html`${CSS}<dt class$='${parentStepClasses}'>${label}</dt>`;
  } else {
    innerHTML = html`${CSS}<dd class='buv-c-verification-step  buv-c-verification-substep  buv-o-text-12'>
      ${label}
      ${ErrorMessage(errorMessage)}
    </dd>`;
  }
  return html`${innerHTML}`;
}
