import { html } from '@polymer/lit-element';
import CSS from './_components.download-link-css';

export default function DownloadLink ({ allowDownload, downloadLink }) {
  if (!allowDownload) {
    return null;
  }

  if (!downloadLink) {
    return null;
  }

  return html`
    ${CSS}
    <a class='buv-c-download-link  buv-qa-download-link' href='${downloadLink}' title='Download Record (JSON format)'>
      <span class='buv-u-visually-hidden'>Download Record in JSON format</span>
    </a>`;
}
