import { html } from '@polymer/lit-element';
import CSS from './_components.download-link-css';

export default function DownloadLink ({ downloadLink, display = '' }) {
  const isPlainText = display === 'plaintext';
  const info = downloadLink ? 'Download Record in JSON format' : 'No link provided for download!';

  // TODO: better handle this dynamic class (cf npm classnames)
  const classes = [
    'buv-c-download-link',
    'buv-o-button-link',
    !downloadLink ? 'is-disabled' : '',
    isPlainText ? '' : 'buv-c-metadata-link--icon'
  ].join(' ');

  return html`
    ${CSS}
    <a class$='${classes}' href='${downloadLink}' title$='${info}' aria-disabled?='${!downloadLink}'>
      <span class$='${isPlainText ? 'buv-o-button-link__label' : 'buv-u-visually-hidden'}'>${info}</span>
    </a>`;
}
