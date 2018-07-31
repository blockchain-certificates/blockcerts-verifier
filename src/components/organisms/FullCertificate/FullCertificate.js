import { html } from '@polymer/lit-element';
import { unsafeHTML } from 'lit-html/lib/unsafe-html.js';
import CSS from './_components.full-certificate-css';
import '../../atoms/CertificateDetails/index';
import '../../atoms/FullCertificateV1';
import '../../molecules/VerifyButton';

function renderDisplayHTML (displayHTML) {
  return html`<section class='buv-c-full-certificate'>${unsafeHTML(displayHTML)}</section>`;
}

export default function FullCertificate ({
  hasCertificateDefinition,
  displayHTML
}) {
  if (!hasCertificateDefinition) {
    return null;
  }

  return html`
    ${CSS}
    ${displayHTML ? renderDisplayHTML(displayHTML) : html`<buv-full-certificate-v1></buv-full-certificate-v1>`}
    <div class='buv-c-full-certificate__details'>
      <buv-certificate-details></buv-certificate-details>
      <buv-verify-button></buv-verify-button>
    </div>
  `;
}
