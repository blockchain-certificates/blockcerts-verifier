import { html } from '@polymer/lit-element';
import { unsafeHTML } from 'lit-html/lib/unsafe-html.js';
import CSS from './_components.full-certificate-css';
import '../../atoms/CertificateDetails';
import '../../atoms/FullCertificateV1';
import '../../atoms/VerifyButton';
import '../../atoms/FinalVerificationStep';

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
      <buv-certificate-details class='buv-c-full-certificate__details-list'></buv-certificate-details>
      <buv-final-verification-step class='buv-c-fullscreen-certificate__verification-status' isVisible hideLink standalone>
        <buv-verify-button type='link'>Verify again</buv-verify-button>
      </buv-final-verification-step>
    </div>
  `;
}
