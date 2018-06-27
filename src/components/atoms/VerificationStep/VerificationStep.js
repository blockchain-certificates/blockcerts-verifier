import { html } from '@polymer/lit-element';

export default function VerificationStep ({ name, status }, parent) {
  let innerHTML
  if (parent) {
    innerHTML = html`<dt>${name}: ${status}</dt>`
  } else {
    innerHTML = html`<dd>${name}: ${status}</dd>`
  }
  return html`${innerHTML}`;
}
