import { html } from '@polymer/lit-element';
import { unsafeHTML } from 'lit-html/lib/unsafe-html.js';
import CSS from './_components.fullscreen-certificate-css';
import '../../atoms/CertificateDetails';
import CloseButton from '../../atoms/CloseButton';
import '../../atoms/DownloadLink';
import '../../atoms/VerifyOtherCertificateLink';
import BlockcertsLogo from '../../atoms/BlockcertsLogo';
import '../../molecules/Metadata';
import '../../molecules/SocialShare';
import '../../molecules/VerifyButton';

export default function FullScreenCertificate ({
  hasCertificateDefinition,
  recipientName,
  displayHTML,
  onClose
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
      <header class='buv-c-fullscreen-certificate-header'>
        <div class='buv-c-fullscreen-certificate-header__content'>
          <h1 class='buv-c-fullscreen-certificate__title'>${recipientName}</h1>
          <buv-verify-button isStandAlone></buv-verify-button>
          ${CloseButton({ onClick: onClose, className: 'buv-c-fullscreen-certificate__close' })}
        </div>  
      </header>
      <section class='buv-c-fullscreen-certificate__content'>
        <div class='buv-c-fullscreen-certificate__details'>
          <buv-certificate-details direction='column' hideRecipientName></buv-certificate-details>
          <buv-metadata class='buv-c-fullscreen-certificate__details-item' display='plaintext'></buv-metadata>
          <buv-download-link class='buv-c-fullscreen-certificate__details-item' display='plaintext'></buv-download-link>
          <buv-social-share class='buv-c-fullscreen-certificate__details-item' display='plaintext'></buv-social-share>
          ${BlockcertsLogo({ className: 'buv-c-fullscreen-certificate__logo', showMotto: true, logoSize: 'medium' })}
          <buv-verify-other-certificate class='buv-c-fullscreen-certificate__verify-other'></buv-verify-other-certificate>
        </div>
        <div class='buv-c-fullscreen-certificate__certificate'>
          ${unsafeHTML(displayHTML)}
        </div>
      </section>
    </section>
  `;
}
