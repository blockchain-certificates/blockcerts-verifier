import { html } from '@polymer/lit-element';

export default function Metadata ({ metadataList }) {
  if (!metadataList) {
    return null;
  }

  const innerHTML = metadataList.displayOrder.map(entry => {
    const key = entry.split('.')[1]; // get key name
    const title = metadataList.schema.properties.certificate.properties[key].title;
    const value = metadataList.certificate[key];

    return html`
      <dt>${title}</dt>
      <dd>${value}</dd>
    `;
  });

  return html`<section><dl>${innerHTML}</dl></section>`;
}
