import { html, LitElement } from '@polymer/lit-element';
import CSS from './_components.modal-css';
import CloseButton from '../../atoms/CloseButton';
import { TemplateResult } from 'lit-html';

export interface ModalProps {
  isOpen?: boolean;
  onClose?: () => any;
}

class Modal extends LitElement {
  private isOpen: boolean;
  private _props: ModalProps;

  constructor () {
    super();
    this.isOpen = false;
    this.handleClick = this.handleClick.bind(this);
  }

  static get properties (): ModalProps {
    return {
      isOpen: Boolean as any,
      onClose: Function as any
    };
  }

  close (): void {
    this.isOpen = false;
  }

  handleClick (): void {
    this.close();
    this._props.onClose();
  }

  _propertiesChanged (props: ModalProps, changedProps: ModalProps, prevProps: ModalProps): void {
    this._props = props;
    super._propertiesChanged(props, changedProps, prevProps);
  }

  _render (): TemplateResult {
    const classes: string = [
      'buv-c-modal',
      'buv-qa-modal',
      this.isOpen ? '' : 'is-hidden'
    ].join(' ');

    return html`
      ${CSS}
      <div class$='${classes}' onclick='${this.handleClick}'>
        <div class='buv-c-modal__content  buv-o-overlay' onclick='${e => { e.stopPropagation(); }}'>
          ${CloseButton({
    className: 'buv-c-modal__close-button',
    onClick: this.handleClick
  })}
          <slot></slot>
        </div>  
      </div>
    `;
  }
}

export default Modal;
