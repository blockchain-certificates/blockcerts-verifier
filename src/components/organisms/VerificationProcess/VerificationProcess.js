import { html } from '@polymer/lit-element';
import VerificationStep from '../../molecules/VerificationStep';
import FinalVerificationStep from '../../atoms/FinalVerificationStep';
import CSS from './_components.verification-process-css';
import * as VERIFICATION_STATUS from '../../../constants/verificationStatus';

export default function VerificationProcess ({ steps, transactionLink, chain }) {
  const innerHTML = steps
    .map((step, i) => html`
      ${VerificationStep(step, true, i === 0)}
      ${step.subSteps.map(substep => html`${VerificationStep(substep)}`)}
    `);

  // TODO: this should likely not be determined in the view
  const hasError = steps.some(s => s.status === VERIFICATION_STATUS.FAILURE);

  // TODO: better handle this dynamic class (cf npm classnames)
  const progressBarClasses = `buv-c-verification-progress-bar ${hasError ? 'has-errored' : ''}`;

  if (!innerHTML.length) {
    return;
  }

  return html`
    ${CSS}
    <div class='buv-c-verification-process'>
      <div class$='${progressBarClasses}'></div>  
      <dl class='buv-c-verification-process__step-list'>
        ${innerHTML}
        ${FinalVerificationStep({ hasError, transactionLink, chain })}
      </dl>
    </div>
  `;
}
