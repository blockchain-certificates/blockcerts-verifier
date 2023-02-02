import { html, LitElement } from '@polymer/lit-element';
import { TemplateResult } from 'lit-html';
import { unsafeHTML } from 'lit-html/lib/unsafe-html.js';
import CSS from './_components.full-certificate-css';
import '../../atoms/CertificateDetails';
import '../../atoms/FullCertificateV1';
import '../../atoms/VerifyButton';
import '../../atoms/FinalVerificationStep';
import getText from '../../../i18n/getText';
import urlToLink from '../../../helpers/urlToLink';
import domain from '../../../domain';
import { IFullScreenCertificateAPI } from '../FullScreenCertificate/FullScreenCertificate';

function renderDisplayHTML (displayHTML: string, clickableUrls: boolean): TemplateResult {
  const buvCertificateClasses: string[] = [
    'buv-c-full-certificate',
    'qa-fullscreen-certificate'
  ];
  if (domain.certificates.displayHtmlHasNoWidthConstraint(displayHTML)) {
    buvCertificateClasses.push('buv-c-certificate--fixed-width');
  }

  const htmlToDisplay = clickableUrls ? urlToLink(displayHTML) : displayHTML;
  return html`<section class$=${buvCertificateClasses.join(' ')}>${unsafeHTML(htmlToDisplay)}</section>`;
}

export interface IFullCertificate {
  clickableUrls?: boolean;
  hasCertificateDefinition?: boolean;
  displayHTML?: string;
}

export class FullCertificateComponent extends LitElement {
  static get properties () {
    return {
      clickableUrls: Boolean,
      hasCertificateDefinition: Boolean,
      displayHTML: String
    };
  }

  _shouldRender (
    _props: IFullScreenCertificateAPI,
    _changedProps: IFullScreenCertificateAPI,
    _prevProps: IFullScreenCertificateAPI
  ): boolean {
    return !!_changedProps?.displayHTML;
  }

  _render ({
    clickableUrls,
    hasCertificateDefinition,
    displayHTML
  }: IFullCertificate): TemplateResult {
    if (!hasCertificateDefinition) {
      return null;
    }

    return html`
    ${CSS}
    ${displayHTML ? renderDisplayHTML(displayHTML, clickableUrls) : html`<buv-full-certificate-v1></buv-full-certificate-v1>`}
    <div class='buv-c-full-certificate__details'>
      <buv-certificate-details class='buv-c-full-certificate__details-list'></buv-certificate-details>
      <buv-final-verification-step class='buv-c-fullscreen-certificate__verification-status' isVisible hideLink standalone>
        <buv-verify-button type='link'>${getText('text.verifyAgain')}</buv-verify-button>
      </buv-final-verification-step>
    </div>
  `;
  }
}

window.customElements.define('buv-full-certificate-raw', FullCertificateComponent);
function FullCertificateWrapper (props: IFullCertificate) {
  return html`
    <buv-full-certificate-raw
      clickableUrls = '${props.clickableUrls}'
      hasCertificateDefinition = '${props.hasCertificateDefinition}'
      displayHTML = '${props.displayHTML}'
    ></buv-full-certificate-raw>`;
}

export {
  FullCertificateWrapper as FullCertificate
};
