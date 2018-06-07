import { html, LitElement } from '@polymer/lit-element';
import { configureStore } from './store';
import CertificateInput from './components/organisms/CertificateInput';

class BlockcertsUniversalVerifier extends LitElement {
  constructor () {
    super ();
    const store = configureStore();
  }
  _render () {
    return html`
       <h1>Blockcerts Universal Verifier</h1>
       ${CertificateInput}
    `;
  }
}

window.customElements.define('blockcerts-universal-verifier', BlockcertsUniversalVerifier);
