import { html, LitElement } from '@polymer/lit-element';
import CSS from './_components.drag-and-drop-css';
import getText from '../../../i18n/getText';

function isJson (file) {
  const { name } = file;
  return name.substr(name.length - 4, 4) === 'json';
}

class DragAndDrop extends LitElement {
  constructor () {
    super();
    this.isDraggedOver = false;
    this.denyDrop = false;
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  static get properties () {
    return {
      isDraggedOver: Boolean,
      denyDrop: Boolean,
      onDrop: Function
    };
  }

  handleDragEnter () {
    this.isDraggedOver = true;
  }

  handleDragOver (e) {
    e.preventDefault();
  }

  handleDragLeave () {
    this.isDraggedOver = false;
  }

  handleDrop (e) {
    e.preventDefault();
    this.isDraggedOver = false;

    const file = e.dataTransfer.files[0];
    this.denyDrop = !isJson(file);

    if (this.denyDrop) {
      return;
    }

    this._props.onDrop(file);
  }

  _propertiesChanged (props, changedProps, prevProps) {
    this._props = props;
    super._propertiesChanged(props, changedProps, prevProps);
  }

  _render () {
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
function DragAndDropWrapper (props) {
  return html`
  <buv-drag-and-drop-raw
    onDrop='${props.onDrop}'
  >
  <slot></slot>
</buv-drag-and-drop-raw>`;
}

export { DragAndDropWrapper as DragAndDrop };
