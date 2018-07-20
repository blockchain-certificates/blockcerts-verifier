import { html } from '@polymer/lit-element';

export default function VerifyOtherCertificateLink ({ onClick = () => {}, isVisible = false } = {}) {
  return html`<a onclick='${onClick}'>Verify another record</a>`
}
