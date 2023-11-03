import { html, LitElement } from '@polymer/lit-element';
import CSS from './_components.drag-and-drop-css';
import getText from '../../../i18n/getText';
import type { TemplateResult } from 'lit-html';

function isJson (file: File): boolean {
  const { name } = file;
  return name.substr(name.length - 4, 4) === 'json';
}

export interface DragAndDropProps {
  isDraggedOver?: boolean;
  denyDrop?: boolean;
  onDrop?: (file: File) => any;
}

class DragAndDrop extends LitElement {
  private isDraggedOver: boolean;
  private denyDrop: boolean;
  private _props: DragAndDropProps;

  constructor () {
    super();
    this.isDraggedOver = false;
    this.denyDrop = false;
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  static get properties (): DragAndDropProps {
    return {
      isDraggedOver: Boolean as any,
      denyDrop: Boolean as any,
      onDrop: Function as any
    };
  }

  handleDragEnter (): void {
    this.isDraggedOver = true;
  }

  handleDragOver (e: DragEvent): void {
    e.preventDefault();
  }

  handleDragLeave (): void {
    this.isDraggedOver = false;
  }

  handleDrop (e: DragEvent): void {
    e.preventDefault();
    this.isDraggedOver = false;

    const file = e.dataTransfer.files[0];
    this.denyDrop = !isJson(file);

    if (this.denyDrop) {
      return;
    }

    this._props.onDrop(file);
  }

  _propertiesChanged (props: DragAndDropProps, changedProps: DragAndDropProps, prevProps: DragAndDropProps): void {
    this._props = props;
    super._propertiesChanged(props, changedProps, prevProps);
  }

  _render (): TemplateResult {
    const classes = [
      'buv-c-drag-and-drop__droparea',
      this.isDraggedOver ? 'is-active' : ''
    ].join(' ');

    const denyText = this.denyDrop ? getText('errors.invalidFormatDragAndDrop') : '';

    return html`
    ${CSS}
    <div ondragenter='${this.handleDragEnter}'>
      <div class$='${classes}'
        ondragover='${this.handleDragOver}'
        ondragleave='${this.handleDragLeave}'
        ondrop='${this.handleDrop}'
      ></div>
      <span>${denyText}</span>
      <slot></slot>
    </div>`;
  }
}

window.customElements.define('buv-drag-and-drop-raw', DragAndDrop);

// wrap DragAndDrop in order to plug into Container
// necessary trade-off to deal with class component in the store connector
function DragAndDropWrapper (props: DragAndDropProps): TemplateResult {
  return html`
  <buv-drag-and-drop-raw
    onDrop='${props.onDrop}'
  >
  <slot></slot>
</buv-drag-and-drop-raw>`;
}

export { DragAndDropWrapper as DragAndDrop };
