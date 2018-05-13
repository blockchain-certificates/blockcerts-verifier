import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `blockcerts-universal-verifier`
 * A standalone universal viewer &amp; verifier for blockcerts credentials
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class BlockcertsUniversalVerifier extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'blockcerts-universal-verifier',
      },
    };
  }
}

window.customElements.define('blockcerts-universal-verifier', BlockcertsUniversalVerifier);
