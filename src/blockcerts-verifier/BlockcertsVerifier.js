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
import { APICamelCase } from '../models/API';
import * as DISPLAY_MODE from '../constants/displayMode';

class BlockcertsVerifier extends LitElement {
  constructor () {
    super();
    this.hasRenderedOnce = false;
  }

  static get properties () {
    return {
      onLoad: Function,
      errorMessage: String,
      hasCertificate: Boolean,
      ...APICamelCase
    };
  }

  _firstRendered () {
    this.onLoad(this._props);
    this.hasRenderedOnce = true;
  }

  _propertiesChanged (props, changedProps, prevProps) {
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

  renderCertificate (_props) {
    switch (_props.displayMode) {
      case DISPLAY_MODE.FULL:
        return html`<buv-full-certificate></buv-full-certificate>`;
      case DISPLAY_MODE.FULLSCREEN:
        return html`<buv-fullscreen-certificate></buv-fullscreen-certificate>`;
      default:
        return html`<buv-card-certificate></buv-card-certificate>`;
    }
  }

  _render (_props) {
    const bodyClass = _props.hasCertificate ? 'buv-c-verifier-body  buv-c-verifier-body--padded' : '';

    return html`
      ${CSS}
      <section class='buv-c-verifier-main'>
        <buv-drag-and-drop>
          <div class='buv-c-verifier-layout'>
            <section class$='${bodyClass}'>
              ${ErrorMessage(_props.errorMessage, true)}
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

// wrap Button in order to plug into Container
// necessary trade-off to deal with class component in the store connector
function BUVWrapper (props = {}) {
  return html`<buv-raw
          src='${props.src}'
          onLoad='${props.onLoad}'
          errorMessage='${props.errorMessage}'
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
