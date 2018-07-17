import { html, LitElement } from '@polymer/lit-element';
import getValueFrom from '../../../helpers/getValueFrom';
import CSS from './_components.metadata-css';

function getProperties (metadataList) {
  return metadataList.schema.properties.certificate.properties
}

class Metadata extends LitElement {
  constructor () {
    super();
    this.isOpen = false;
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  static get properties () {
    return {
      isOpen: Boolean,
      metadataList: Object,
      showMetadata: Boolean
    }
  }

  toggleOpen () {
    this.isOpen = !this.isOpen;
  }

  _render ({ metadataList, showMetadata }) {
    if (!showMetadata) {
      return null;
    }

    if (!metadataList) {
      return null;
    }

    const properties = getProperties(metadataList);

    const innerHTML = metadataList.displayOrder.map(entry => {
      const key = entry.split('.')[1]; // get key name
      const title = properties[key].title;
      const value = getValueFrom(metadataList, entry);

      return html`
      <dt class='buv-c-metadata-list__title'>${title}</dt>
      <dd class='buv-c-metadata-list__detail'>${value}</dd>
    `;
    });

    return html`
    ${CSS}
    <section><dl class='buv-o-small-text'>${innerHTML}</dl></section>
  `;
  }
}

window.customElements.define('buv-metadata-raw', Metadata);

function MetadataWrapper (props) {
  return html`
    <buv-metadata-raw
      metadataList='${props.metadataList}'
      showMetadata='${props.showMetadata}'
    ></buv-metadata-raw>`;
}

export {
  MetadataWrapper as Metadata
}
