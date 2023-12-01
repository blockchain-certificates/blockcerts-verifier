import { html, LitElement } from '@polymer/lit-element';
import type { TemplateResult } from 'lit-html';
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
  static get properties (): IFullScreenCertificateAPI {
    // if the interface is defined properly with typescript, then the boolean values do not get updated.
    return {
      clickableUrls: Boolean as any,
      hasCertificateDefinition: Boolean as any,
      recipientName: String as any,
      displayHTML: String as any,
      onClose: Function as any,
      disableDownloadPdf: Boolean as any
    };
  }

  _shouldRender (
    props: IFullScreenCertificateAPI,
    changedProps: IFullScreenCertificateAPI,
    prevProps: IFullScreenCertificateAPI
  ): boolean {
    // we actually want to re rerender when the hasCertificateDefinition flag is set to false (ie: verify new record)
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
    return !!changedProps?.displayHTML || changedProps?.hasCertificateDefinition === false;
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
      // lit-element won't enter the rendering path if the content is null
      // (does not satisfy if condition in _propertiesChanged method)
      return html``;
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
            <buv-certificate-details display='column' hideRecipientName></buv-certificate-details>
            <buv-metadata class='buv-c-fullscreen-certificate__details-item  buv-c-fullscreen-certificate__separator' display='plaintext'></buv-metadata>
            ${disableDownloadPdf ? '' : html`<buv-download-pdf-link class='buv-c-fullscreen-certificate__details-item' display='plaintext'></buv-download-pdf-link>`}
            <buv-download-link class='buv-c-fullscreen-certificate__details-item' display='plaintext'></buv-download-link>
            <buv-social-share class='buv-c-fullscreen-certificate__details-item' display='plaintext'></buv-social-share>
            ${BlockcertsLogo({ className: 'buv-c-fullscreen-certificate__separator', showMotto: true })}
            <buv-verify-other-certificate class='buv-c-fullscreen-certificate__verify-other'></buv-verify-other-certificate>
          </div>
          <div class$=${buvFullscreenCertificateClasses.join(' ')}>
            ${renderDisplayHTML(displayHTML, clickableUrls)}
          </div>
        </section>
      </section>
    `;
  }
}

window.customElements.define('buv-fullscreen-certificate-raw', FullScreenCertificateComponent);
function FullScreenCertificateWrapper (props: IFullScreenCertificateAPI): TemplateResult {
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
