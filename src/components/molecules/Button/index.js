import { html, LitElement } from '@polymer/lit-element';

class Button extends LitElement {
  _render () {
    return html`
    <button class='buv-c-button'>Verify</button>
  `;
  }
}

window.customElements.define('buv-button', Button);
