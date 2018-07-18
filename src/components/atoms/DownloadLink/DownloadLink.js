import { html } from '@polymer/lit-element';
import CSS from './_components.download-link-css';

export default function DownloadLink ({ downloadLink }) {
  if (!downloadLink) {
    // TODO: disable link instead
    return null;
  }

  return html`
    ${CSS}
    <a class='buv-c-download-link' href='${downloadLink}' title='Download Record (JSON format)'>
      <span class='buv-u-visually-hidden'>Download Record in JSON format</span>
    </a>`;
}
