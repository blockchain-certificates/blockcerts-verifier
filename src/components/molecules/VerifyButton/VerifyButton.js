import { html, LitElement } from '@polymer/lit-element';
import CSS from './_components.verify-button-css';
import Spinner from '../../atoms/Spinner';

class VerifyButton extends LitElement {
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

  getButtonText () {
    return html`<label>Verify</label>`;
  }

  getSpinner () {
    return html`${Spinner}`;
  }

  _propertiesChanged (props, changedProps, prevProps) {
    this._props = props;
    super._propertiesChanged(props, changedProps, prevProps);
  }

  _render () {
    const showSpinner = this.showSpinner && !this.cancelSpinner;

    const buttonClass = [
      'buv-c-verify-button',
      this.isDisabled ? 'is-disabled' : '',
      showSpinner ? 'has-spinner' : ''
    ].join(' ');

    return html`
      ${CSS}
      <button class$='${buttonClass}' on-click='${this.handleClick}' disabled?='${this.isDisabled}'>
       ${showSpinner ? this.getSpinner() : this.getButtonText()}
      </button>
    `;
  }
}

window.customElements.define('buv-verify-button-raw', VerifyButton);

// wrap VerifyButton in order to plug into Container
// necessary trade-off to deal with class component in the store connector
function ButtonWrapper (props) {
  return html`
  <buv-verify-button-raw
    onClick='${props.onClick}'
    cancelSpinner='${props.cancelSpinner}'
    isDisabled='${props.isDisabled}'
  ></buv-verify-button-raw>`;
}

export { ButtonWrapper as Button };
