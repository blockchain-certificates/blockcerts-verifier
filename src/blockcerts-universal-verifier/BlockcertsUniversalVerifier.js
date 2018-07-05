import { html, LitElement } from '@polymer/lit-element';
import CertificateInput from '../components/organisms/CertificateInput';
import '../components/atoms/FileUpload';
import '../components/organisms/VerificationProcess';
import CSS from '../components/atoms/GlobalStylesheet';

class BlockcertsUniversalVerifier extends LitElement {
  static get properties () {
    return {
      src: String,
      onLoad: Function
    }
  }

  _firstRendered () {
    this.onLoad(this.src)
  }

  _propertiesChanged (props, changedProps, prevProps) {
    this._props = props;
    super._propertiesChanged(props, changedProps, prevProps)
  }

  _render (_props) {
    return html`
      ${CSS}
      <section class='buv-c-verifier-main'>
        <h1>Blockcerts Universal Verifier</h1>
        ${CertificateInput}
        <buv-file-upload></buv-file-upload>
        <buv-verification-process></buv-verification-process>
      </section>
    `;
  }
}

window.customElements.define('buv-raw', BlockcertsUniversalVerifier);

// wrap Button in order to plug into Container
// necessary trade-off to deal with class component in the store connector
function BUVWrapper (props) {
  return html`
  <buv-raw src='${props.src}' onLoad='${props.onLoad}'></buv-raw>`;
}

export {
  BlockcertsUniversalVerifier as SourceComponent,
  BUVWrapper as BlockcertsUniversalVerifier
};
