import { html } from '@polymer/lit-element';
import VerificationStep from '../../molecules/VerificationStep';

export default function VerificationProcess ({ steps }) {
  const innerHTML = steps.map(step => html`
    ${VerificationStep(step, true)}
    ${step.substeps.map(substep => html`${VerificationStep(substep)}`)}
  `);

  if (!innerHTML.length) {
    return;
  }

  return html`
    <dl>
        ${innerHTML}
        <dd></dd>
    </dl>
  `;
}

// last dd is for not breaking accessibility test, since the last dt is the final verified step
// TODO: we should find a nicer fix, but that may come naturally
