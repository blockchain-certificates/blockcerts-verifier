import { html } from '@polymer/lit-element';
import { unsafeHTML } from 'lit-html/lib/unsafe-html.js';

export default function FullCertificate ({ hasCertificateDefinition, displayHTML }) {
  if (!hasCertificateDefinition) {
    return null;
  }

  return html`<div>${unsafeHTML(displayHTML)}</div>`;
}
