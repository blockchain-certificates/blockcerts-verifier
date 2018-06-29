import { html } from '@polymer/lit-element';

export default function ErrorMessage (message) {
  if (message == null) {
    return;
  }

  return html`<p>${message}</p>`;
}
