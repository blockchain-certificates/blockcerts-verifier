import { html } from '@polymer/lit-element';

export default function Metadata ({ metadataList }) {
  console.log(metadataList);
  return html`<section>${metadataList}</section>`
}
