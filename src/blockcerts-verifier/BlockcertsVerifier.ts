import { html, LitElement } from '@polymer/lit-element';
import '../components/organisms/CertificateInput';
import '../components/organisms/ActionMenu';
import '../components/organisms/VerificationModal';
import '../components/atoms/DragAndDrop';
import ErrorMessage from '../components/atoms/ErrorMessage/';
import CSS from '../components/atoms/GlobalStylesheet';
import '../components/organisms/CardCertificate';
import '../components/organisms/FullCertificate';
import '../components/organisms/FullScreenCertificate';
import '../components/molecules/Footer/';
import type { IBlockcertsVerifierAPI } from '../models/API';
import { APICamelCase } from '../models/API';
import { DISPLAY_MODE } from '../constants/displayMode';
import type { THEME } from '../constants/theme';
import type { ExplorerAPI } from '@blockcerts/explorer-lookup';
import type { TemplateResult } from 'lit-html';

export interface IBlockcertsVerifierProps {
  // path to hosted certificate, or certificate as a string
  src?: string;
  // hook function called when component is rendered
  onLoad?: (IBlockcertsVerifierProps) => any;
  // the error message to be displayed, if any
  errorMessage?: string;
  additionalErrorInfo?: string;
  // boolean to check if a certificate has been loaded into the component
  hasCertificate?: boolean;
  // flag to disable foreground verification modal (background verification still occurs)
  disableAutoVerify?: boolean;
  // flag to disable verification
  disableVerify?: boolean;
  // flag to allow downloading the certificate json file
  allowDownload?: boolean;
  // flag to disable downloading the certificate as PDF
  disableDownloadPdf?: boolean;
  // flag to allow sharing certificate url on social medias
  allowSocialShare?: boolean;
  // configure the way the certificate is rendered (card mode, full mode or fullscreen mode)
  displayMode?: DISPLAY_MODE;
  // flag to display the "metadata" field of the certificate json
  showMetadata?: boolean;
  // flag to control whether URLs within the display property of the certificate are converted to hyperlinks or not
  clickableUrls?: boolean;
  // configure some colors to adapt to bright or dark HTML page context
  theme?: THEME;
  // language configuration
  locale?: string;
  // pass down your own configuration to a blockchain explorer. Allows for custom chains and/or custom API tokens
  explorerAPIs?: ExplorerAPI[];
  // point to your own DID resolver url
  didResolverUrl?: string;
}

class BlockcertsVerifier extends LitElement {
  private hasRenderedOnce: boolean;
  private _props: IBlockcertsVerifierProps;
  public onLoad: (IBlockcertsVerifierProps) => any = () => {};

  constructor () {
    super();
    this.hasRenderedOnce = false;
  }

  static get properties (): IBlockcertsVerifierProps {
    return {
      onLoad: Function as any,
      errorMessage: String as any,
      additionalErrorInfo: String as any,
      hasCertificate: Boolean as any,
      ...APICamelCase
    };
  }

  _firstRendered (): void {
    this.onLoad(this._props);
    this.hasRenderedOnce = true;
  }

  _propertiesChanged (props: IBlockcertsVerifierProps, changedProps: IBlockcertsVerifierProps, prevProps: IBlockcertsVerifierProps): void {
    this._props = props;
    super._propertiesChanged(props, changedProps, prevProps);

    if (changedProps.src !== prevProps.src && this.hasRenderedOnce) {
      this.onLoad({
        src: changedProps.src
      });
    }

    if (!!changedProps.explorerAPIs && !prevProps.explorerAPIs) {
      this.onLoad({
        explorerAPIs: changedProps.explorerAPIs
      });
    }
  }

  renderCertificate (_props: IBlockcertsVerifierProps): TemplateResult {
    switch (_props.displayMode) {
      case DISPLAY_MODE.FULL:
        return html`<buv-full-certificate></buv-full-certificate>`;
      case DISPLAY_MODE.FULLSCREEN:
        return html`<buv-fullscreen-certificate></buv-fullscreen-certificate>`;
      default:
        return html`<buv-card-certificate></buv-card-certificate>`;
    }
  }

  _render (_props: IBlockcertsVerifierProps): TemplateResult {
    const bodyClass = _props.hasCertificate ? 'buv-c-verifier-body  buv-c-verifier-body--padded' : '';

    return html`
      ${CSS}
      <section class='buv-c-verifier-main'>
        <buv-drag-and-drop>
          <div class='buv-c-verifier-layout'>
            <section class$='${bodyClass}'>
              ${ErrorMessage(_props.errorMessage, _props.additionalErrorInfo, true)}
              <buv-certificate-input></buv-certificate-input>
              <buv-action-menu></buv-action-menu>
              ${this.renderCertificate(_props)}
              <buv-verification-modal></buv-verification-modal>
            </section>
            <buv-footer interactive></buv-footer>
          </div>
        </buv-drag-and-drop>
      </section>
    `;
  }
}

window.customElements.define('buv-raw', BlockcertsVerifier);

interface BUVWrapperProps extends IBlockcertsVerifierAPI {
  onLoad?: (IBlockcertsVerifierProps) => any;
  errorMessage?: string;
  additionalErrorInfo?: string;
  hasCertificate?: boolean;
}

// wrap Button in order to plug into Container
// necessary trade-off to deal with class component in the store connector
function BUVWrapper (props: BUVWrapperProps = {}): TemplateResult {
  return html`<buv-raw
          src='${props.src}'
          onLoad='${props.onLoad}'
          errorMessage='${props.errorMessage}'
          additionalErrorInfo='${props.additionalErrorInfo}'
          hasCertificate='${props.hasCertificate}'
          disableAutoVerify='${props['disable-auto-verify']}'
          disableVerify='${props['disable-verify']}'
          allowDownload='${props['allow-download']}'
          disableDownloadPdf='${props['disable-download-pdf']}'
          allowSocialShare='${props['allow-social-share']}'
          displayMode='${props['display-mode']}'
          showMetadata='${props['show-metadata']}'
          clickableUrls='${props['clickable-urls']}'
          theme='${props.theme}'
          locale='${props.locale}'
          explorerAPIs='${props.explorerAPIs}'
          didResolverUrl='${props['did-resolver-url']}'
        ></buv-raw>`;
}

export {
  BlockcertsVerifier as SourceComponent,
  BUVWrapper as BlockcertsVerifier
};
