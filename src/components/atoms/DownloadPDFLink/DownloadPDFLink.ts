import { html } from '@polymer/lit-element';
import CSS from './_components.download-pdf-link-css';
import getText from '../../../i18n/getText';
import { TemplateResult } from 'lit-html';
import { CONTENT_TYPES } from '../../../constants/contentTypes';

export interface IDownloadPDFLinkApi {
  display?: string;
  isVisible?: boolean;
  contentType?: CONTENT_TYPES;
  contentEncoding?: string;
  content?: string;
}

export default function DownloadPDFLink ({
  display = '',
  isVisible = true,
  contentType = null,
  contentEncoding = '',
  content = ''
}: IDownloadPDFLinkApi = {
  display: '',
  isVisible: true,
  contentType: null,
  contentEncoding: '',
  content: ''
}): TemplateResult {
  if (!isVisible) {
    return null;
  }

  const onClick = (): void => {
    console.log('on click', contentType, contentEncoding, content);
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
