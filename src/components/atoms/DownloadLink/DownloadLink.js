import { html } from '@polymer/lit-element';
import CSS from './_components.download-link-css';
import getText from '../../../i18n/getText';

export default function DownloadLink ({ downloadLink, display = '' }) {
  if (!downloadLink) {
    return null;
  }

  const isPlainText = display === 'plaintext';
  const info = getText('text.downloadLink');

  // TODO: better handle this dynamic class (cf npm classnames)
  const classes = [
    'buv-c-download-link',
    'buv-o-button-link',
    isPlainText ? '' : 'buv-c-download-link--icon'
  ].join(' ');

  return html`
    ${CSS}
    <a class$='${classes}' href='${downloadLink}' title$='${info}'>
      <span class$='${isPlainText ? 'buv-o-button-link__label' : 'buv-u-visually-hidden'}'>${info}</span>
    </a>`;
}
