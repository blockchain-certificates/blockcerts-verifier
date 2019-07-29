import { html, LitElement } from '@polymer/lit-element';
import getValueFrom from '../../../helpers/getValueFrom';
import CSS from './_components.metadata-css';
import CloseButton from '../../atoms/CloseButton';

function getProperties (metadataList) {
  return metadataList.schema.properties.certificate.properties;
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
      display: String
    };
  }

  toggleOpen () {
    this.isOpen = !this.isOpen;
  }

  _render ({ metadataList, display }) {
    // TODO: better handle this dynamic class (cf npm classnames)
    const panelClasses = [
      'buv-o-overlay',
      'buv-c-metadata-container',
      'buv-u-slide-from-right',
      this.isOpen ? 'is-active' : ''
    ].join(' ');

    let innerHTML = '';
    if (metadataList) {
      const properties = getProperties(metadataList);
      innerHTML = metadataList.displayOrder.map(entry => {
        const key = entry.split('.')[1]; // get key name
        const title = properties[key].title;
        const value = getValueFrom(metadataList, entry);

        return html`
          <dt class='buv-c-metadata-list__title'>${title}</dt>
          <dd class='buv-c-metadata-list__detail'><pre class='buv-c-metadata-list__detail-text'>${value}</pre></dd>
        `;
      });
    }

    const isPlainText = display === 'plaintext';

    const info = metadataList ? 'View Metadata' : 'No metadata specified for this record';
    const buttonClasses = [
      'buv-c-metadata-link',
      'buv-o-button-link',
      isPlainText ? '' : 'buv-c-metadata-link--icon'
    ].join(' ');

    return html`
      ${CSS}
      <button onclick='${this.toggleOpen}' 
        class$='${buttonClasses}' 
        disabled?='${!metadataList}' 
        aria-disabled?='${!metadataList}'
        title$=${info}>
        <label class$='${isPlainText ? 'buv-o-button-link__label' : 'buv-u-visually-hidden'}'>${info}</label>
      </button>
      <section class$='${panelClasses}'>
        <h1 class='buv-c-metadata-container__title'>Certificate Metadata</h1>
        ${CloseButton({
    onClick: this.toggleOpen,
    className: 'buv-c-metadata-container__close-button'
  })}
        <dl class='buv-c-metadata-list  buv-o-text-12'>${innerHTML}</dl>
      </section>
    `;
  }
}

window.customElements.define('buv-metadata-raw', Metadata);

function MetadataWrapper (props) {
  return html`
    <buv-metadata-raw
      metadataList='${props.metadataList}'
      display='${props.display}'
    ></buv-metadata-raw>`;
}

export {
  MetadataWrapper as Metadata
};
