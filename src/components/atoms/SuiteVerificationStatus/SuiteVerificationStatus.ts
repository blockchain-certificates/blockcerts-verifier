import { html } from '@polymer/lit-element';
import CSS from './_components.suite-verification-status-css';
import { VERIFICATION_STATUSES } from '@blockcerts/cert-verifier-js';
import type { TemplateResult } from 'lit-html';
import { getText } from '../../../i18n';

export interface ISuiteVerificationStatus {
  isTestChain: boolean;
  status: VERIFICATION_STATUSES;
}

function getTitle (isTestChain: boolean, status: VERIFICATION_STATUSES): string {
  let message = 'signatureStatusSuccess';

  if (isTestChain) {
    message = 'signatureStatusTestSuccess';
  }

  if (status === VERIFICATION_STATUSES.FAILURE) {
    message = 'signatureStatusFailure';
  }

  return getText('text', message);
}

export default function SuiteVerificationStatus ({
  isTestChain,
  status
}: ISuiteVerificationStatus): TemplateResult {
  const classes = [
    'buv-c-final-verification-step',
    'buv-c-suite-verification-status',
    'is-visible',
    `is-${status}`,
    isTestChain ? 'is-test' : ''
  ].join(' ');

  return html`
      ${CSS}
      <a class$='${classes}' title$='${getTitle(isTestChain, status)}'><slot></slot></a>
  `;
}
