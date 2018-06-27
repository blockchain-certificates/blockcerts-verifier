import { html } from '@polymer/lit-element';

export default function VerificationProcess ({ steps }) {
  const innerHTML = steps.map(step => html`
    <li>${step.stepName}: ${step.status}</li>
  `)

  return html`
    <ul>
        ${innerHTML}
    </ul>
  `
}
