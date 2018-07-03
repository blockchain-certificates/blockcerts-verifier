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
    this.onClick = () => {};
  }

  static get properties () {
    return {
      showSpinner: Boolean,
      cancelSpinner: Boolean,
      onClick: Function,
      isDisabled: Boolean
    };
  }

  handleClick () {
    this._props.onClick();
    this.showSpinner = true;
  }

  _propertiesChanged (props, changedProps, prevProps) {
    this._props = props;
    super._propertiesChanged(props, changedProps, prevProps);
  }

  _render () {
    const buttonClass = [
      'buv-c-button',
      this.isDisabled ? 'is-disabled' : ''
    ].join(' ');

    return html`
      ${CSS}
      <button class$='${buttonClass}' on-click='${this.handleClick}' disabled?='${this.isDisabled}'>
       ${this.showSpinner && !this.cancelSpinner ? 'Spinner' : 'Verify'}
      </button>
    `;
  }
}

window.customElements.define('buv-button-raw', Button);

// wrap Button in order to plug into Container
// necessary trade-off to deal with class component in the store connector
function ButtonWrapper (props) {
  return html`
  <buv-button-raw
    onClick='${props.onClick}'
    cancelSpinner='${props.cancelSpinner}'
    isDisabled='${props.isDisabled}'
  ></buv-button-raw>`;
}

export { ButtonWrapper as Button };
