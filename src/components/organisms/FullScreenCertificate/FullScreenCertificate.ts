import { html, LitElement } from '@polymer/lit-element';
import { TemplateResult } from 'lit-html';
import { unsafeHTML } from 'lit-html/lib/unsafe-html.js';
import CSS from './_components.fullscreen-certificate-css';
import '../../atoms/CertificateDetails';
import CloseButton from '../../atoms/CloseButton';
import '../../atoms/DownloadLink';
import '../../atoms/DownloadPDFLink';
import '../../atoms/FinalVerificationStep';
import '../../atoms/VerifyOtherCertificateLink';
import BlockcertsLogo from '../../atoms/BlockcertsLogo';
import '../../atoms/VerifyButton';
import '../../atoms/FullCertificateV1';
import '../../molecules/Metadata';
import '../../molecules/SocialShare';
import getText from '../../../i18n/getText';
import urlToLink from '../../../helpers/urlToLink';
import domain from '../../../domain';

function renderDisplayHTML (displayHTML: string, clickableUrls: boolean): TemplateResult {
  const htmlToDisplay = clickableUrls ? urlToLink(displayHTML) : displayHTML;
  return html`${unsafeHTML(htmlToDisplay)}`;
}

export interface IFullScreenCertificateAPI {
  clickableUrls?: boolean;
  hasCertificateDefinition?: boolean;
  recipientName?: string;
  displayHTML?: string;
  onClose?: () => any;
  disableDownloadPdf?: boolean;
}

export class FullScreenCertificateComponent extends LitElement {
  static get properties () {
    return {
      clickableUrls: Boolean,
      hasCertificateDefinition: Boolean,
      recipientName: String,
      displayHTML: String,
      onClose: Function,
      disableDownloadPdf: Boolean
    };
  }

  _render ({
    clickableUrls,
    hasCertificateDefinition,
    recipientName,
    displayHTML,
    onClose,
    disableDownloadPdf
  }: IFullScreenCertificateAPI): TemplateResult {
    if (!hasCertificateDefinition) {
      return null;
    }

    const buvFullscreenCertificateClasses: string[] = [
      'buv-c-fullscreen-certificate__certificate',
      'qa-fullscreen-certificate'
    ];
    if (displayHTML && domain.certificates.displayHtmlHasNoWidthConstraint(displayHTML)) {
      buvFullscreenCertificateClasses.push('buv-c-certificate--fixed-width');
    }

    return html`
      ${CSS}
      <section class='buv-c-fullscreen-certificate'>
        <header class='buv-c-fullscreen-certificate-header'>
          <div class='buv-c-fullscreen-certificate-header__content'>
            <h1 class='buv-c-fullscreen-certificate__title'>${recipientName}</h1>
            ${CloseButton({ onClick: onClose, className: 'buv-c-fullscreen-certificate__close' })}
          </div>  
        </header>
        <section class='buv-c-fullscreen-certificate__content'>
          <div class='buv-c-fullscreen-certificate__details'>
            <buv-final-verification-step class='buv-c-fullscreen-certificate__verification-status' isVisible hideLink standalone>
              <buv-verify-button type='link'>${getText('text.verifyAgain')}</buv-verify-button>
            </buv-final-verification-step>
            <buv-certificate-details direction='column' hideRecipientName></buv-certificate-details>
            <buv-metadata class='buv-c-fullscreen-certificate__details-item  buv-c-fullscreen-certificate__separator' display='plaintext'></buv-metadata>
            ${disableDownloadPdf ? '' : html`<buv-download-pdf-link class='buv-c-fullscreen-certificate__details-item' display='plaintext'></buv-download-pdf-link>`}
            <buv-download-link class='buv-c-fullscreen-certificate__details-item' display='plaintext'></buv-download-link>
            <buv-social-share class='buv-c-fullscreen-certificate__details-item' display='plaintext'></buv-social-share>
            ${BlockcertsLogo({ className: 'buv-c-fullscreen-certificate__separator', showMotto: true })}
            <buv-verify-other-certificate class='buv-c-fullscreen-certificate__verify-other'></buv-verify-other-certificate>
          </div>
          <div class$=${buvFullscreenCertificateClasses.join(' ')}>
            ${displayHTML ? renderDisplayHTML(displayHTML, clickableUrls) : html`<buv-full-certificate-v1></buv-full-certificate-v1>`}
          </div>
        </section>
      </section>
    `;
  }
}

window.customElements.define('buv-fullscreen-certificate-raw', FullScreenCertificateComponent);
function FullScreenCertificateWrapper (props: IFullScreenCertificateAPI) {
  return html`
    <buv-fullscreen-certificate-raw
      clickableUrls = '${props.clickableUrls}'
      hasCertificateDefinition = '${props.hasCertificateDefinition}'
      recipientName = '${props.recipientName}'
      displayHTML = '${props.displayHTML}'
      onClose = '${props.onClose}'
      disableDownloadPdf = '${props.disableDownloadPdf}'
    ></buv-fullscreen-certificate-raw>`;
}

export {
  FullScreenCertificateWrapper as FullScreenCertificate
};
