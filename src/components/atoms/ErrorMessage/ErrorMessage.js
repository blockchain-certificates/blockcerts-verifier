import { html } from '@polymer/lit-element'
import CSS from './_components.error-message-css';

export default function ErrorMessage (message) {
  if (message == null) {
    return null;
  }

  return html`
    ${CSS}
    <p class='buv-c-error-message'>
      <span class='buv-c-error-message-title'>Error</span>
      ${message}
    </p>`;
}
