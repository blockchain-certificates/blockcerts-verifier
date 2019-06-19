import { html, LitElement } from '@polymer/lit-element';
import '../components/organisms/CertificateInput';
import '../components/organisms/ActionMenu';
import '../components/organisms/VerificationModal';
import '../components/atoms/DragAndDrop';
import ErrorMessage from '../components/atoms/ErrorMessage/';
import CSS from '../components/atoms/GlobalStylesheet';
import '../components/organisms/CardCertificate';
import '../components/organisms/FullCertificate';
import '../components/molecules/Footer/';
import { APICamelCase } from '../models/API';
import * as DISPLAY_MODE from '../constants/displayMode';

class BlockcertsVerifier extends LitElement {
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
  }

  _propertiesChanged (props, changedProps, prevProps) {
    this._props = props;
    super._propertiesChanged(props, changedProps, prevProps);

    if (changedProps.src !== prevProps.src) {
      this.onLoad({
        src: changedProps.src
      });
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
              ${_props.displayMode === DISPLAY_MODE.FULL
    ? html`<buv-full-certificate></buv-full-certificate>`
    : html`<buv-card-certificate></buv-card-certificate>`
}
              <buv-verification-modal></buv-verification-modal>
            </section>
            ${!_props.hideFooter ? '<buv-footer interactive></buv-footer>' : ''}
          </div>
        </buv-drag-and-drop>
      </section>
    `;
  }
}

window.customElements.define('buv-raw', BlockcertsVerifier);

// wrap Button in order to plug into Container
// necessary trade-off to deal with class component in the store connector
function BUVWrapper (props) {
  return html`<buv-raw
          src='${props.src}'
          certificate='${props.certificate}'
          onLoad='${props.onLoad}'
          errorMessage='${props.errorMessage}'
          hasCertificate='${props.hasCertificate}'
          disableAutoVerify='${props['disable-auto-verify']}'
          disableVerify='${props['disable-verify']}'
          allowDownload='${props['allow-download']}'
          allowSocialShare='${props['allow-social-share']}'
          displayMode='${props['display-mode']}'
          showMetadata='${props['show-metadata']}'
          hideFooter='${props['hide-footer']}'
          theme='${props.theme}'
        ></buv-raw>`;
}

export {
  BlockcertsVerifier as SourceComponent,
  BUVWrapper as BlockcertsVerifier
};
