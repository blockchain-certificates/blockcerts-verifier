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
    // this is a trick to manage the display of the spinner without triggering contempt from LitElement
    // not having it as a property allows us to reset it without warning.
    this.activateSpinner = this.showSpinner;
    this.cancelSpinner = false;
    this.onClick = () => {};
  }

  static get properties () {
    return {
      showSpinner: Boolean,
      cancelSpinner: Boolean,
      onClick: Function,
      isDisabled: Boolean,
      isHollow: Boolean,
      isStandAlone: Boolean
    };
  }

  handleClick () {
    this._props.onClick();
    this.showSpinner = true;
    this.activateSpinner = this.showSpinner;
  }

  getButtonText () {
    return html`<label class='buv-c-verify-button__label'>Verify</label>`;
  }

  getSpinner () {
    return html`${Spinner({ isInverted: this.isHollow })}`;
  }

  _propertiesChanged (props, changedProps, prevProps) {
    this._props = props;
    if (props.cancelSpinner) {
      this.activateSpinner = false;
    }
    super._propertiesChanged(props, changedProps, prevProps);
  }

  _render () {
    const buttonClass = [
      'buv-c-verify-button',
      this.isHollow ? 'buv-c-verify-button--hollow' : '',
      this.isStandAlone ? 'buv-c-verify-button--standalone' : '',
      this.isDisabled ? 'is-disabled' : '',
      this.activateSpinner ? 'has-spinner' : ''
    ].join(' ');

    return html`
      ${CSS}
      <button class$='${buttonClass}' on-click='${this.handleClick}' disabled?='${this.isDisabled}'>
       ${this.activateSpinner ? this.getSpinner() : this.getButtonText()}
      </button>
    `;
  }
}

window.customElements.define('buv-verify-button-raw', VerifyButton);

// wrap VerifyButton in order to plug into Container
// necessary trade-off to deal with class component in the store connector
function VerifyButtonWrapper (props) {
  return html`
  <buv-verify-button-raw
    onClick='${props.onClick}'
    cancelSpinner='${props.cancelSpinner}'
    isDisabled='${props.isDisabled}'
    isHollow='${props.isHollow}'
    isStandAlone='${props.isStandAlone}'
  ></buv-verify-button-raw>`;
}

export { VerifyButtonWrapper as VerifyButton };
