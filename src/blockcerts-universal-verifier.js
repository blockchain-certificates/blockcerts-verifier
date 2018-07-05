import { html, LitElement } from '@polymer/lit-element';
import CertificateInput from './components/organisms/CertificateInput';
import './components/atoms/FileUpload';
import './components/organisms/VerificationProcess';
import CSS from './components/atoms/GlobalStylesheet';

class BlockcertsUniversalVerifier extends LitElement {
  static get properties () {
    return {
      src: String,
      certificate: Object
    }
  }

  _firstRendered () {
    console.log('first rendered', this._props);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.status === 200 && xmlhttp.readyState === 4){
        this.certificate = xmlhttp.responseText;
      }
    }.bind(this);
    xmlhttp.open("GET", this.src, true);
    xmlhttp.send();
  }

  _propertiesChanged (props, changedProps, prevProps) {
    this._props = props;
    console.log(this._props);

    super._propertiesChanged(props, changedProps, prevProps)
  }

  _render (_props) {
    console.log('render', this._props);

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

window.customElements.define('blockcerts-universal-verifier', BlockcertsUniversalVerifier);
