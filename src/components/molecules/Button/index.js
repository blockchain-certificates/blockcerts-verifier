import { html, LitElement } from '@polymer/lit-element';
import CSS from './_components.button-css';

class Button extends LitElement {
  constructor () {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.showSpinner = false;
  }

  static get properties() {
    return {
      showSpinner: Boolean
    }
  }

  handleClick () {
    this.showSpinner = !this.showSpinner;
  }

  _render () {
    return html`
      ${CSS}
      <button class='buv-c-button' on-click='${this.handleClick}'>
       ${this.showSpinner ? 'Spinner' : 'Verify'}
      </button>
    `;
  }
}

window.customElements.define('buv-button', Button);
