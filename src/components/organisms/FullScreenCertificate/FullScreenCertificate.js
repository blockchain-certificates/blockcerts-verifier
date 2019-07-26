import { html } from '@polymer/lit-element';
import { unsafeHTML } from 'lit-html/lib/unsafe-html.js';
import CSS from './_components.fullscreen-certificate-css';
import '../../atoms/CertificateDetails/index';
import '../../atoms/FullCertificateV1';
import '../../molecules/VerifyButton';

export default function FullScreenCertificate ({
  hasCertificateDefinition,
  displayHTML
}) {
  if (!hasCertificateDefinition) {
    return null;
  }

  if (!displayHTML) {
    return null;
  }

  return html`
    ${CSS}
    <section class='buv-c-fullscreen-certificate'>${unsafeHTML(displayHTML)}</section>
    <div class='buv-c-fullscreen-certificate__details'>
      <buv-certificate-details class='buv-c-fullscreen-certificate__details-list'></buv-certificate-details>
      <buv-verify-button class='buv-c-fullscreen-certificate__button' isHollow></buv-verify-button>
    </div>
  `;
}
