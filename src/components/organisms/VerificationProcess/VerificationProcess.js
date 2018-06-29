import { html } from '@polymer/lit-element';
import VerificationStep from '../../molecules/VerificationStep';
import CSS from './_components.verification-process-css';

export default function VerificationProcess ({ steps }) {
  const innerHTML = steps.map(step => html`
    ${VerificationStep(step, true)}
    ${step.substeps.map(substep => html`${VerificationStep(substep)}`)}
  `);

  if (!innerHTML.length) {
    return;
  }

  return html`
    ${CSS}
    <div class='buv-c-verification-process'>
      <div class='buv-c-verification-progress-bar'></div>  
      <dl>
        ${innerHTML}
        <dd></dd>
      </dl>
    </div>
  `;
}

// last dd is for not breaking accessibility test, since the last dt is the final verified step
// TODO: we should find a nicer fix, but that may come naturally
