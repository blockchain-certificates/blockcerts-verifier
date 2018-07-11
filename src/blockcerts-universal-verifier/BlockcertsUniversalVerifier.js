import { html, LitElement } from '@polymer/lit-element';
import CertificateInput from '../components/organisms/CertificateInput';
import ErrorMessage from '../components/atoms/ErrorMessage/';
import '../components/atoms/CardCertificate';
import '../components/atoms/DragAndDrop';
import '../components/atoms/FileUpload';
import '../components/organisms/VerificationProcess';
import CSS from '../components/atoms/GlobalStylesheet';
import { APICamelCase } from '../models/API';

class BlockcertsUniversalVerifier extends LitElement {
  static get properties () {
    return {
      onLoad: Function,
      errorMessage: String,
      ...APICamelCase
    };
  }

  _firstRendered () {
    this.onLoad(this._props);
  }

  _propertiesChanged (props, changedProps, prevProps) {
    this._props = props;
    super._propertiesChanged(props, changedProps, prevProps);
  }

  _render (_props) {
    return html`
      ${CSS}
      <section class='buv-c-verifier-main'>
        <h1>Blockcerts Universal Verifier</h1>
        ${ErrorMessage(_props.errorMessage)}
        <buv-drag-and-drop>
            ${CertificateInput}
        </buv-drag-and-drop>
        <buv-file-upload></buv-file-upload>
        <buv-card-certificate></buv-card-certificate>
        <buv-verification-process></buv-verification-process>
      </section>
    `;
  }
}

window.customElements.define('buv-raw', BlockcertsUniversalVerifier);

// wrap Button in order to plug into Container
// necessary trade-off to deal with class component in the store connector
function BUVWrapper (props) {
  return html`<buv-raw
          src='${props.src}'
          onLoad='${props.onLoad}'
          errorMessage='${props.errorMessage}'
          disableAutoVerify='${props['disable-auto-verify']}'
          disableVerify='${props['disable-verify']}'
          allowDownload='${props['allow-download']}'
        ></buv-raw>`;
}

export {
  BlockcertsUniversalVerifier as SourceComponent,
  BUVWrapper as BlockcertsUniversalVerifier
};
