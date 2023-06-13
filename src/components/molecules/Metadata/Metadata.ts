import { html, LitElement } from '@polymer/lit-element';
import getValueFrom from '../../../helpers/getValueFrom';
import CSS from './_components.metadata-css';
import CloseButton from '../../atoms/CloseButton';
import getText from '../../../i18n/getText';
import FormattedMetadataItem from '../../atoms/FormattedMetadataItem';
import { TemplateResult } from 'lit-html';

export interface IMetadataProps {
  _isOpen?: boolean;
  metadataList?: any; // TODO: define metadata object as it's supposed to be (see cert-issuer python checks)
  display?: string;
}
function getProperties (metadataList: any): any { // TODO: define metadata object as it's supposed to be (see cert-issuer python checks)
  return metadataList.schema?.properties.certificate.properties;
}

class Metadata extends LitElement {
  private _isOpen: boolean;

  constructor () {
    super();
    this._isOpen = false;
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  static get properties (): IMetadataProps {
    return {
      _isOpen: Boolean as any,
      metadataList: Object as any,
      display: String as any
    };
  }

  toggleOpen (): void {
    this._isOpen = !this._isOpen;
  }

  _render ({ metadataList, display }: IMetadataProps): TemplateResult {
    // TODO: better handle this dynamic class (cf npm classnames)
    const panelClasses = [
      'buv-o-overlay',
      'buv-c-metadata-container',
      'buv-u-slide-from-right',
      this._isOpen ? 'is-active' : ''
    ].join(' ');

    let innerHTML = '';
    if (metadataList) {
      const properties = getProperties(metadataList);
      innerHTML = metadataList.displayOrder?.map(entry => {
        const key = entry.split('.')[1]; // get key name
        const value = getValueFrom(metadataList, entry);
        return FormattedMetadataItem(properties[key], value);
      });
    }

    const isPlainText = display === 'plaintext';

    const info = metadataList ? getText('text.metadataButton') : getText('errors.noMetadata');
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
        <h1 class='buv-c-metadata-container__title'>${getText('text.metadataTitle')}</h1>
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

function MetadataWrapper (props: IMetadataProps): TemplateResult {
  return html`
    <buv-metadata-raw
      metadataList='${props.metadataList}'
      display='${props.display}'
    ></buv-metadata-raw>`;
}

export {
  MetadataWrapper as Metadata
};
