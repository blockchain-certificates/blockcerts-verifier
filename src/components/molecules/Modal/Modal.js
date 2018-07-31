import { html, LitElement } from '@polymer/lit-element';
import CSS from './_components.modal-css';
import CloseButton from '../../atoms/CloseButton/index';

class Modal extends LitElement {
  constructor () {
    super();
    this.isOpen = false;
    this.handleClick = this.handleClick.bind(this);
  }

  static get properties () {
    return {
      isOpen: Boolean,
      onClose: Function
    };
  }

  toggleOpen () {
    this.isOpen = !this.isOpen;
  }

  handleClick () {
    this.toggleOpen();
    this._props.onClose();
  }

  _propertiesChanged (props, changedProps, prevProps) {
    this._props = props;
    super._propertiesChanged(props, changedProps, prevProps);
  }

  _render () {
    const classes = [
      'buv-c-modal',
      'buv-qa-modal',
      'buv-o-overlay',
      this.isOpen ? '' : 'is-hidden'
    ].join(' ');

    return html`
      ${CSS}
      <div class$=${classes}>
        ${CloseButton({
    className: 'buv-c-modal__close-button',
    onClick: this.handleClick
  })}
        <slot></slot>
      </div>
    `;
  }
}

export default Modal;
