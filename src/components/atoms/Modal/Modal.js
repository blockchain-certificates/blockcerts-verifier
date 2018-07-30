import { html, LitElement } from '@polymer/lit-element';
import CSS from './_components.modal-css';

class Modal extends LitElement {
  _render () {
    return html`
      ${CSS}
      <div class='buv-c-modal  buv-o-overlay'>
        <slot></slot>
      </div>
    `;
  }
}

export default Modal
