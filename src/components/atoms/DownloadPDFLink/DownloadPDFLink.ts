import { html, LitElement } from '@polymer/lit-element';
import CSS from './_components.download-pdf-link-css';
import getText from '../../../i18n/getText';
import { TemplateResult } from 'lit-html';
import { CONTENT_TYPES } from '../../../constants/contentTypes';
import domain from '../../../domain';

export interface IDownloadPDFLinkApi {
  display?: string;
  isVisible?: boolean;
  contentType?: CONTENT_TYPES;
  contentEncoding?: string;
  content?: string;
  recipientName?: string;
  certificateTitle?: string;
  issueDate?: string;
  issuerName?: string;
  issuerLogo?: string;
  recordLink?: string;
  issuerPublicKey?: string;
}

class DownloadPDFLink extends LitElement {
  constructor () {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  static get properties (): any {
    return {
      display: String,
      isVisible: Boolean,
      contentType: String,
      contentEncoding: String,
      content: String,
      recipientName: String,
      certificateTitle: String,
      issueDate: String,
      issuerName: String,
      issuerLogo: String,
      recordLink: String,
      issuerPublicKey: String
    };
  }

  _render (props: IDownloadPDFLinkApi): TemplateResult {
    if (!props.isVisible) {
      return null;
    }

    const isPlainText = props.display === 'plaintext';
    const label: string = getText('text.downloadPDFLink');
    const labelIsLoading: string = getText('text.downloadPDFLinkIsLoading');

    const classes = [
      'buv-o-button-link',
      'buv-c-download-pdf-link',
      isPlainText ? '' : 'buv-c-download-pdf-link__icon'
    ].join(' ');

    return html`
      ${CSS}
      <button onclick='${async () => { await this.handleClick(props); }}'
              class$='${classes}'
              title$='${label}'>
        <label class$='buv-c-download-pdf-link__label ${isPlainText ? 'buv-o-button-link__label' : 'buv-u-visually-hidden'}'>
          <span class='buv-c-download-pdf-link__label--static'>${label}</span>
          <span class='buv-c-download-pdf-link__label--loading'>${labelIsLoading}</span>
        </label>
      </button>`;
  }

  toggleButtonLoading (isLoading: boolean) {
    const buttonElement: HTMLElement = this.shadowRoot.querySelector('.buv-c-download-pdf-link');
    buttonElement.classList.toggle('buv-c-download-pdf-link--loading', isLoading);
  }

  async handleClick (props: IDownloadPDFLinkApi): Promise<void> {
    this.toggleButtonLoading(true);
    await domain.certificates.downloadPDF(props);
    this.toggleButtonLoading(false);
  }
}

window.customElements.define('buv-download-pdf-link-raw', DownloadPDFLink);

// wrap DownloadPDFLink in order to plug into Container
// necessary trade-off to deal with class component in the store connector
function DownloadPDFLinkWrapper (props): TemplateResult {
  return html`
    <buv-download-pdf-link-raw
      display='${props.display}' ,
      isVisible='${props.isVisible}' ,
      contentType='${props.contentType}' ,
      contentEncoding='${props.contentEncoding}' ,
      content='${props.content}' ,
      recipientName='${props.recipientName}' ,
      certificateTitle='${props.certificateTitle}' ,
      issueDate='${props.issueDate}' ,
      issuerName='${props.issuerName}' ,
      issuerLogo='${props.issuerLogo}' ,
      recordLink='${props.recordLink}' ,
      issuerPublicKey='${props.issuerPublicKey}'
    ></buv-download-pdf-link-raw>`;
}

export default DownloadPDFLink; // component export for testing
export { DownloadPDFLinkWrapper as DownloadPDFLink };
