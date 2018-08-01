import { html } from '@polymer/lit-element';
import VerificationStep from '../../molecules/VerificationStep/index';

export default function SubstepsList (substeps) {
  return html`
  ${substeps
    .filter(substep => !!substep.status)
    .map(substep => html`${VerificationStep(substep)}`)
  }
  `;
}
