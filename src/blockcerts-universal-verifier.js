import { html, LitElement } from '@polymer/lit-element';
import CertificateInput from './components/organisms/CertificateInput';
import './components/organisms/VerificationProcess';
import CSS from './components/atoms/GlobalStylesheet';

class BlockcertsUniversalVerifier extends LitElement {
  _render () {
    return html`
      ${CSS}
      <section class='buv-c-verifier-main'>
        <h1>Blockcerts Universal Verifier</h1>
        ${CertificateInput}
        <buv-verification-process></buv-verification-process>
      </section>
    `;
  }
}

window.customElements.define('blockcerts-universal-verifier', BlockcertsUniversalVerifier);
