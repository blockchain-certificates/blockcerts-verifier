import { html } from '@polymer/lit-element';
import CSS from './_components.suite-verification-status-css';
import { VERIFICATION_STATUSES } from '@blockcerts/cert-verifier-js';
import type { TemplateResult } from 'lit-html';

export interface ISuiteVerificationStatus {
  isTestChain: boolean;
  status: VERIFICATION_STATUSES;
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

  let title = 'This signature has been successfully verified';

  if (isTestChain) {
    title = 'This signature has been successfully verified but has been issued on a test chain';
  }

  if (status === VERIFICATION_STATUSES.FAILURE) {
    title = 'This signature yielded an error during verification';
  }

  return html`
      ${CSS}
      <a class$='${classes}' title$='${title}'><slot></slot></a>
  `;
}
