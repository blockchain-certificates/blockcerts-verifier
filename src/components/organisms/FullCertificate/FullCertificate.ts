import { html } from '@polymer/lit-element';
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
  hasCertificateDefinition: boolean;
  displayHTML?: string;
}

export default function FullCertificate ({
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
