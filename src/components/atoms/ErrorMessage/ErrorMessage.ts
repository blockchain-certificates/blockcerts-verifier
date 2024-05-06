import { html } from '@polymer/lit-element';
import CSS from './_components.error-message-css';
import getText from '../../../i18n/getText';
import type { TemplateResult } from 'lit-html';

function isMessageTranslatable (message: string): boolean {
  return message.includes('.') && !message.includes(' ');
}

function translate (message: string): string {
  if (isMessageTranslatable(message)) {
    return getText(message);
  }
  return message;
}

export default function ErrorMessage (message: string, additionalErrorInfo: string = '', solidBackground = false): TemplateResult {
  if (message == null) {
    return null;
  }

  const classes: string = [
    'buv-c-error-message',
    'buv-qa-error-message',
    solidBackground ? 'buv-c-error-message--solid' : ''
  ].join(' ');

  return html`
    ${CSS}
    <div class$='${classes}'>
      <p>
      <span class='buv-c-error-message-title'>${getText('errors.errorLabel')}</span>
      ${translate(message)}
      </p>
        ${additionalErrorInfo
            ? html`<p class='buv-c-error-message-additional-info'>
                <span class='buv-c-error-message-additional-info-title'>${getText('errors.additionalErrorInfoLabel')}</span>
                <br>
                <br>
                ${additionalErrorInfo}
              </p>`
            : ''
        }
    </div>
  `;
}
