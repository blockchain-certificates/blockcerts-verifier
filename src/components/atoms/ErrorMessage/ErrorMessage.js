import { html } from '@polymer/lit-element';
import CSS from './_components.error-message-css';

export default function ErrorMessage (message, solidBackground = false) {
  if (message == null) {
    return null;
  }

  const classes = [
    'buv-c-error-message',
    'buv-qa-error-message',
    solidBackground ? 'buv-c-error-message--solid' : ''
  ].join(' ');

  return html`
    ${CSS}
    <p class$='${classes}'>
      <span class='buv-c-error-message-title'>Error</span>
      ${message}
    </p>`;
}
