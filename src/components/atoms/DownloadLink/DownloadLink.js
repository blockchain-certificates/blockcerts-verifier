import { html } from '@polymer/lit-element';
import CSS from './_components.download-link-css';
import getText from '../../../i18n/getText';

export default function DownloadLink ({ downloadLink, display = '' }) {
  const isPlainText = display === 'plaintext';
  const info = downloadLink ? getText('text.downloadLink') : getText('errors.noDownloadLink');

  // TODO: better handle this dynamic class (cf npm classnames)
  const classes = [
    'buv-c-download-link',
    'buv-o-button-link',
    !downloadLink ? 'is-disabled' : '',
    isPlainText ? '' : 'buv-c-download-link--icon'
  ].join(' ');

  return html`
    ${CSS}
    <a class$='${classes}' href='${downloadLink}' title$='${info}' aria-disabled?='${!downloadLink}'>
      <span class$='${isPlainText ? 'buv-o-button-link__label' : 'buv-u-visually-hidden'}'>${info}</span>
    </a>`;
}
