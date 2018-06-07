import { html, LitElement } from '@polymer/lit-element';
import Input from './components/atoms/Input';
import './components/molecules/Button';

class BlockcertsUniversalVerifier extends LitElement {
  _render () {
    return html`
       <h1>Blockcerts Universal Verifier</h1>
       ${Input}<buv-button></buv-button>
    `;
  }
}

window.customElements.define('blockcerts-universal-verifier', BlockcertsUniversalVerifier);
