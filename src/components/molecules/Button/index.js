import { html, LitElement } from '@polymer/lit-element';
import CSS from './_components.button-css';

class Button extends LitElement {
  _render () {
    return html`
    ${CSS}
    <button class='buv-c-button'>Verify</button>
  `;
  }
}

window.customElements.define('buv-button', Button);
