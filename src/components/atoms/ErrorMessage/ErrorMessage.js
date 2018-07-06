import { html } from '@polymer/lit-element';

export default function ErrorMessage (message) {
  if (message == null) {
    return null;
  }

  return html`<p class='buv-c-verification-process__error-message'>
    <span class='buv-c-verification-process__error-message-title'>Error</span>
    ${message}
  </p>`;
}
