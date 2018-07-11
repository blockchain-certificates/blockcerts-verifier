import { html } from '@polymer/lit-element';
import CSS from './_components.download-link-css';

export default function DownloadLink (allowDownload, certificateDownloadLink) {
  if (!allowDownload || !certificateDownloadLink) {
    return null;
  }

  return html`
    ${CSS}
    <a href='${certificateDownloadLink}' title='Download Record (JSON format)'>
      <span class='buv-u-visually-hidden'>Download Record in JSON format</span>
    </a>`;
}
