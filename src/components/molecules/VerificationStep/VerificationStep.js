import { html } from '@polymer/lit-element';
import ErrorMessage from '../../atoms/ErrorMessage';

export default function VerificationStep ({ name, status, errorMessage }, parent) {
  let innerHTML;
  if (parent) {
    innerHTML = html`<dt class='buv-c-verification-step'>${name}: ${status}</dt>`;
  } else {
    innerHTML = html`<dd>
      ${name}: ${status}
      ${ErrorMessage(errorMessage)}
    </dd>`;
  }
  return html`${innerHTML}`;
}
