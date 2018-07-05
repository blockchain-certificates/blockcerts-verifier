import { html, LitElement } from '@polymer/lit-element';

class DragAndDrop extends LitElement {
  constructor () {
    super();
    this.isDraggedOver = false;

    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  static get properties () {
    return {
      isDraggedOver: Boolean
    };
  }

  handleDragOver () {
    this.isDraggedOver = true;
  }

  handleDragLeave () {
    this.isDraggedOver = false;
  }

  handleDrop () {
    this.isDraggedOver = false;
  }

  _render () {
    return html`
    <div 
      ondragover='${this.handleDragOver}'
      ondragleave='${this.handleDragLeave}'
      ondrop='${this.handleDrop}'
    >
      <h1>Drag here</h1>
      <slot></slot>
    </div>`;
  }
}

export default DragAndDrop;
