import { html, LitElement } from '@polymer/lit-element';
import CSS from './_components.button-css';

class Button extends LitElement {
  handleClick () {
    console.log('button click');
  }

  _render () {
    return html`
      ${CSS}
      <button class='buv-c-button' on-click='${this.handleClick}'>Verify</button>
    `;
  }
}

window.customElements.define('buv-button', Button);
