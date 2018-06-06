import { html, LitElement } from '@polymer/lit-element';
import Input from './components/atoms/Input';
import './components/molecules/Button';

import CSS from './styles/main.js';

class BlockcertsUniversalVerifier extends LitElement {
  _render () {
    return html`
       ${CSS}
       <h1>Blockcerts Universal Verifier</h1>
       ${Input}<buv-button></buv-button>
    `;
  }
}

window.customElements.define('blockcerts-universal-verifier', BlockcertsUniversalVerifier);
