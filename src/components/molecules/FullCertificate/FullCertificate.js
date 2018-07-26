import { html } from '@polymer/lit-element';
import { unsafeHTML } from 'lit-html/lib/unsafe-html.js';
import CSS from './_components.full-certificate-css';
import '../../atoms/CertificateDetails/index';

export default function FullCertificate ({
  hasCertificateDefinition,
  displayHTML
}) {
  if (!hasCertificateDefinition) {
    return null;
  }

  return html`
    ${CSS}
    <section class='buv-c-full-certificate'>${unsafeHTML(displayHTML)}</section>
    <buv-certificate-details></buv-certificate-details>
  `;
}
