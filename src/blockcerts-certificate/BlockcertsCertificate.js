import { html, LitElement } from '@polymer/lit-element';
import '../components/organisms/VerificationModal';
import CSS from '../components/atoms/GlobalStylesheet';
import '../components/organisms/CardCertificate';
import '../components/organisms/FullCertificate';
import { APICamelCase } from '../models/API';
import * as DISPLAY_MODE from '../constants/displayMode';

class BlockcertsCertificate extends LitElement {
  static get properties () {
    return {
      onLoad: Function,
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
    if (changedProps.certificate !== prevProps.certificate) {
      this.onLoad({
        certificate: changedProps.certificate
      });
    }
  }

  _render (_props) {
    const bodyClass = _props.hasCertificate ? 'buv-c-verifier-body  buv-c-verifier-body--padded' : '';

    return html`
      ${CSS}
      <section class$='${bodyClass}'>
        ${_props.displayMode === DISPLAY_MODE.FULL
    ? html`<buv-full-certificate></buv-full-certificate>`
    : html`<buv-card-certificate></buv-card-certificate>`
}
        <buv-verification-modal></buv-verification-modal>
      </section>
    `;
  }
}

window.customElements.define('buv-raw', BlockcertsCertificate);

// wrap Button in order to plug into Container
// necessary trade-off to deal with class component in the store connector
function BUVWrapper (props) {
  return html`<buv-raw
          src='${props.src}'
          certificate='${props.certificate}'
          onLoad='${props.onLoad}'
          hasCertificate='${props.hasCertificate}'
          disableAutoVerify='${props['disable-auto-verify']}'
          disableVerify='${props['disable-verify']}'
          allowDownload='${props['allow-download']}'
          allowSocialShare='${props['allow-social-share']}'
          displayMode='${props['display-mode']}'
          showMetadata='${props['show-metadata']}'
          theme='${props.theme}'
        ></buv-raw>`;
}

export {
  BlockcertsCertificate as SourceComponent,
  BUVWrapper as BlockcertsCertificate
};
