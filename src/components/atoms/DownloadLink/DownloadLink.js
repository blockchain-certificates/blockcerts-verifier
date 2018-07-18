import { html } from '@polymer/lit-element';
import CSS from './_components.download-link-css';

export default function DownloadLink ({ downloadLink }) {
  // TODO: better handle this dynamic class (cf npm classnames)
  const classes = [
    'buv-c-download-link',
    'buv-o-button-link',
    !downloadLink ? 'is-disabled' : ''
  ].join(' ');

  const info = downloadLink ? 'Download Record in JSON format' : 'No link provided for download!';

  return html`
    ${CSS}
    <a class$='${classes}' href='${downloadLink}' title$='${info}' aria-disabled?='${!downloadLink}'>
      <span class='buv-u-visually-hidden'>${info}</span>
    </a>`;
}
