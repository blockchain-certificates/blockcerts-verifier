import { html, LitElement } from '@polymer/lit-element';
import CSS from './_components.modal-css';
import CloseButton from '../CloseButton/';

class Modal extends LitElement {
  constructor () {
    super();
    this.isOpen = false;
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  static get properties () {
    return {
      isOpen: Boolean
    };
  }

  toggleOpen () {
    this.isOpen = !this.isOpen;
  }

  _render () {
    const classes = [
      'buv-c-modal',
      'buv-o-overlay',
      this.isOpen ? '' : 'is-hidden'
    ].join(' ');

    return html`
      ${CSS}
      <div class$=${classes}>
        ${CloseButton({
    className: 'buv-c-modal__close-button',
    onClick: this.toggleOpen
  })}
        <slot></slot>
      </div>
    `;
  }
}

export default Modal;
