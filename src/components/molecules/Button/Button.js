import { html, LitElement } from '@polymer/lit-element';
import CSS from './_components.button-css';

class Button extends LitElement {
  constructor () {
    super();
    this.defaultProps();
    this.handleClick = this.handleClick.bind(this);
  }

  defaultProps () {
    this.showSpinner = false;
    this.cancelSpinner = false;
    this.onClick = () => {}
  }

  static get properties () {
    return {
      showSpinner: Boolean,
      cancelSpinner: Boolean,
      onClick: Function
    };
  }

  handleClick () {
    this._props.onClick();
    this.showSpinner = true;
  }

  _propertiesChanged(props, changedProps, prevProps) {
    this._props = props;
    super._propertiesChanged(props, changedProps, prevProps);
  }

  _render (_props) {
    return html`
      ${CSS}
      <button class='buv-c-button' on-click='${this.handleClick}'>
       ${this.showSpinner && !this.cancelSpinner ? 'Spinner' : 'Verify'}
      </button>
    `;
  }
}

window.customElements.define('buv-button-raw', Button);

// wrap Button in order to plug into Container
// necessary trade-off to deal with class component in the store connector
function ButtonWrapper (props) {
  return html`<buv-button-raw onClick='${props.onClick}' cancelSpinner='${props.cancelSpinner}'></buv-button-raw>`;
}

export { ButtonWrapper as Button };
