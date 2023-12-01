import { html, LitElement } from '@polymer/lit-element';
import type { TemplateResult } from 'lit-html';
import { unsafeHTML } from 'lit-html/lib/unsafe-html.js';
import CSS from './_components.full-certificate-css';
import '../../atoms/CertificateDetails';
import '../../atoms/VerifyButton';
import '../../atoms/FinalVerificationStep';
import getText from '../../../i18n/getText';
import urlToLink from '../../../helpers/urlToLink';
import domain from '../../../domain';
import type { IFullScreenCertificateAPI } from '../FullScreenCertificate/FullScreenCertificate';

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

export interface IFullCertificateAPI {
  clickableUrls?: boolean;
  hasCertificateDefinition?: boolean;
  displayHTML?: string;
}

export class FullCertificateComponent extends LitElement {
  static get properties (): IFullCertificateAPI {
    // if the interface is defined properly with typescript, then the boolean values do not get updated.
    return {
      clickableUrls: Boolean as any,
      hasCertificateDefinition: Boolean as any,
      displayHTML: String as any
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
    displayHTML
  }: IFullCertificateAPI): TemplateResult {
    if (!hasCertificateDefinition) {
      // lit-element won't enter the rendering path if the content is null
      // (does not satisfy if condition in _propertiesChanged method)
      return html``;
    }

    return html`
    ${CSS}
    ${renderDisplayHTML(displayHTML, clickableUrls)}
    <div class='buv-c-full-certificate__details'>
      <buv-final-verification-step class='buv-c-fullscreen-certificate__verification-status' isVisible hideLink standalone>
        <buv-verify-button type='link'>${getText('text.verifyAgain')}</buv-verify-button>
      </buv-final-verification-step>
      <buv-certificate-details display="grid" class='buv-c-full-certificate__details-list'></buv-certificate-details>
    </div>
  `;
  }
}

window.customElements.define('buv-full-certificate-raw', FullCertificateComponent);
function FullCertificateWrapper (props: IFullCertificateAPI): TemplateResult {
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
