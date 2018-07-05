import { html, LitElement } from '@polymer/lit-element';

class DragAndDrop extends LitElement {
  _render () {
    return html`<div>
      <h1>Drag here</h1>
      <slot></slot>
    </div>`;
  }
}

export default DragAndDrop;
