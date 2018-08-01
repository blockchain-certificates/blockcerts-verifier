import { html } from '@polymer/lit-element';
import VerificationStep from '../../molecules/VerificationStep';
import FinalVerificationStep from '../../atoms/FinalVerificationStep';
import '../SubstepsList';
import CSS from './_components.verification-process-css';

export default function VerificationProcess ({ steps, transactionLink, chain, hasError, isTestChain }) {
  const innerHTML = steps
    .map((step, i) => html`
      ${VerificationStep({
    ...step,
    isParent: true,
    isFirst: i === 0,
    isTestChain
  })}
      <buv-substeps-list subSteps='${step.subSteps.filter(subStep => !!subStep.status)}'></buv-substeps-list>
    `);

  // TODO: better handle this dynamic class (cf npm classnames)
  const progressBarClasses = [
    'buv-c-verification-progress-bar',
    hasError ? 'has-errored' : '',
    isTestChain ? 'is-test' : ''
  ].join(' ');

  if (!innerHTML.length) {
    return;
  }

  return html`
    ${CSS}
    <section class='buv-c-verification-process'>
      <div class$='${progressBarClasses}'></div>  
      <dl class='buv-c-verification-process__step-list'>
        ${innerHTML}
        ${FinalVerificationStep({ hasError, transactionLink, chain, isTestChain })}
      </dl>
    </section>
  `;
}
