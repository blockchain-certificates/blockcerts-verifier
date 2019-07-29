import { html } from '@polymer/lit-element';
import { unsafeHTML } from 'lit-html/lib/unsafe-html.js';
import CSS from './_components.fullscreen-certificate-css';
import '../../atoms/CertificateDetails';
import BlockcertsLogo from '../../atoms/BlockcertsLogo/index';
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
    <section class='buv-c-fullscreen-certificate'>
      <header class="buv-c-fullscreen-certificate__header">
        <buv-verify-button class='buv-c-fullscreen-certificate__button'></buv-verify-button>
      </header>
      <section class="buv-c-fullscreen-certificate__content">
        <div class='buv-c-fullscreen-certificate__details'>
          <buv-certificate-details class='buv-c-fullscreen-certificate__details-list' direction="column"></buv-certificate-details>
          ${BlockcertsLogo()}
        </div>
        <div class='buv-c-fullscreen-certificate__certificate'>
          ${unsafeHTML(displayHTML)}
        </div>
      </section>
    </section>
  `;
}
