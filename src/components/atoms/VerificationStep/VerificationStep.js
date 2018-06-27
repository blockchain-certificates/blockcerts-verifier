import { html } from '@polymer/lit-element';

export default function VerificationStep ({ stepName, status }) {
  return html`<li>${stepName}: ${status}</li>`
}
