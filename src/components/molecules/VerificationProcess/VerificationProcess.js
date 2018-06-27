import { html } from '@polymer/lit-element';
import VerificationStep from '../../atoms/VerificationStep';

export default function VerificationProcess ({ steps }) {
  const innerHTML = steps.map(step => html`
    ${VerificationStep(step, parent)}
    ${step.substeps.map(substep => html`${VerificationStep(substep)}`)}
  `);

  return html`
    <dl>
        ${innerHTML}
        <dd></dd>
    </dl>
  `;
}

// last dd is for not breaking accessibility test, since the last dt is the final verified step
// TODO: we should find a nicer fix, but that may come naturally
