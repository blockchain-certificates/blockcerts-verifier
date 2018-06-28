import { html } from '@polymer/lit-element';
import ErrorMessage from '../ErrorMessage';

export default function VerificationStep ({ name, status, errorMessage }, parent) {
  let innerHTML;
  if (parent) {
    innerHTML = html`<dt>${name}: ${status}</dt>`;
  } else {
    innerHTML = html`<dd>
      ${name}: ${status}
      ${ErrorMessage(errorMessage)}
    </dd>`;
  }
  return html`${innerHTML}`;
}
