import { html } from '@polymer/lit-element';
import { unsafeHTML } from 'lit-html/lib/unsafe-html.js';
import CSS from './_components.full-certificate-css';

export default function FullCertificate ({ hasCertificateDefinition, displayHTML }) {
  if (!hasCertificateDefinition) {
    return null;
  }

  return html`
    ${CSS}
    <div class='buv-c-full-certificate'>${unsafeHTML(displayHTML)}</div>
  `;
}
