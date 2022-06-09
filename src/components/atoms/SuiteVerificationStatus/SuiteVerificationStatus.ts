import { html } from '@polymer/lit-element';
import type { TemplateResult } from 'lit-html';
import type { VERIFICATION_STATUSES } from '@blockcerts/cert-verifier-js';
import CSS from './_components.suite-verification-status-css';

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

  return html`
      ${CSS}
      <a class$='${classes}'><slot></slot></a>
  `;
}
