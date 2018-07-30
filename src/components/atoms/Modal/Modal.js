import { html, LitElement } from '@polymer/lit-element';
import CSS from './_components.modal-css';
import CloseButton from '../CloseButton/';

class Modal extends LitElement {
  _render () {
    return html`
      ${CSS}
      <div class='buv-c-modal  buv-o-overlay'>
        ${CloseButton({
       className: 'buv-c-modal__close-button'
    })}
        <slot></slot>
      </div>
    `;
  }
}

export default Modal
