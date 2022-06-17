import { html } from '@polymer/lit-element';
import CSS from './_components.download-pdf-link-css';
import getText from '../../../i18n/getText';
import { TemplateResult } from 'lit-html';

export interface IDownloadPDFLinkApi {
  display?: string;
  isVisible?: boolean;
  onClick?: any;
  isGeneratingPDF?: boolean;
}

export default function DownloadPDFLink ({
  display = 'plaintext',
  isGeneratingPDF = false,
  onClick = () => {},
  isVisible = true
}: IDownloadPDFLinkApi = {
  display: 'plaintext',
  isGeneratingPDF: false,
  onClick: () => {},
  isVisible: true
}): TemplateResult {
  if (!isVisible) {
    return null;
  }

  const isPlainText = display === 'plaintext';
  const label: string = getText('text.downloadPDFLink');
  const labelIsLoading: string = getText('text.downloadPDFLinkIsLoading');

  const classes = [
    'buv-o-button-link',
    'buv-c-download-pdf-link',
    'buv-js-download-pdf-link',
    isPlainText ? '' : 'buv-c-download-pdf-link__icon',
    isGeneratingPDF ? 'buv-c-download-pdf-link--loading' : ''
  ].join(' ');

  return html`
      ${CSS}
      <button onclick='${onClick}'
              class$='${classes}'
              title$='${label}'>
        <label class$='buv-c-download-pdf-link__label ${isPlainText ? 'buv-o-button-link__label' : 'buv-u-visually-hidden'}'>
          <span class='buv-c-download-pdf-link__label--static'>${label}</span>
          <span class='buv-c-download-pdf-link__label--loading'>${labelIsLoading}</span>
        </label>
      </button>`;
}
