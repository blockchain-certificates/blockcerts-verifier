import { html, LitElement } from '@polymer/lit-element';
import CertificateInput from './components/organisms/CertificateInput';
import './components/molecules/VerificationProcess';

class BlockcertsUniversalVerifier extends LitElement {
  _render () {
    return html`
       <h1>Blockcerts Universal Verifier</h1>
       ${CertificateInput}
       <buv-verification-process></buv-verification-process>
    `;
  }
}

window.customElements.define('blockcerts-universal-verifier', BlockcertsUniversalVerifier);
