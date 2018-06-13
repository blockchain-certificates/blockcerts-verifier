import { html, LitElement } from '@polymer/lit-element';
import CSS from './_components.button-css';

class Button extends LitElement {
  constructor () {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.showSpinner = false;
  }

  static get properties () {
    return {
      showSpinner: Boolean,
      onClick: Function
    };
  }

  handleClick () {
    this._props.onClick();
    this.showSpinner = !this.showSpinner;
  }

  _render (_props) {
    // TODO: find a better location to assign these props
    this._props = _props;
    return html`
      ${CSS}
      <button class='buv-c-button' on-click='${this.handleClick}'>
       ${this.showSpinner ? 'Spinner' : 'Verify'}
      </button>
    `;
  }
}

window.customElements.define('buv-button-raw', Button);

// wrap Button in order to plug into Container
// necessary trade-off to deal with class component in the store connector
function ButtonWrapper (props) {
  return html`<buv-button-raw onClick='${props.onClick}'></buv-button-raw>`;
}

export { ButtonWrapper as Button };
