import { html } from '@polymer/lit-element';
import getValueFrom from '../../../helpers/getValueFrom';

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
      <dt>${title}</dt>
      <dd>${value}</dd>
    `;
  });

  return html`<section><dl>${innerHTML}</dl></section>`;
}
