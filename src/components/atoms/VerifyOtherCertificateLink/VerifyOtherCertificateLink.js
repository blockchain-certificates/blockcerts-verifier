import { html } from '@polymer/lit-element';

export default function VerifyOtherCertificateLink ({ onClick = () => {}, isVisible = false } = {}) {
  if (!isVisible) {
    return null;
  }

  return html`<a onclick='${onClick}'>Verify another record</a>`
}
