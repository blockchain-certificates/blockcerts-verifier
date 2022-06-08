import { html } from '@polymer/lit-element';
import CSS from './_components.download-pdf-link-css';
import getText from '../../../i18n/getText';
import { TemplateResult } from 'lit-html';

export interface IDownloadPDFLinkApi {
  isVisible?: boolean;
  display?: string;
}

export default function DownloadPDFLink ({ isVisible = true, display = '' }: IDownloadPDFLinkApi = {
  isVisible: true,
  display: ''
}): TemplateResult {
  if (!isVisible) {
    return null;
  }

  const onClick = (): void => {
    console.log('on click');
  };

  const isPlainText = display === 'plaintext';
  const label: string = getText('text.downloadPDFLink');

  const classes = [
    'buv-o-button-link',
    'buv-c-download-pdf-link',
    isPlainText ? '' : 'buv-c-download-pdf-link--icon'
  ].join(' ');

  return html`
    ${CSS}
    <button onclick='${onClick}'
            class$='${classes}'
            title$='${label}'>
      <label class$='${isPlainText ? 'buv-o-button-link__label' : 'buv-u-visually-hidden'}'>${label}</label>
    </button>
  `;
}
