import { html } from '@polymer/lit-element';
import getValueFrom from '../../../helpers/getValueFrom';
import CSS from './_components.metadata-css';

function getProperties (metadataList) {
  return metadataList.schema.properties.certificate.properties
}

export default function Metadata ({ metadataList }) {
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
