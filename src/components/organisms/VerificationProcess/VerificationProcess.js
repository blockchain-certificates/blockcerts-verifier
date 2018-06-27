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
    </dl>
  `;
}
