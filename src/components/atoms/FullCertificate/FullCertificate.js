import { html } from '@polymer/lit-element';

export default function CardCertificate ({ hasCertificateDefinition }) {
  if (!hasCertificateDefinition) {
    return null;
  }

  return html`<div></div>`;
}
