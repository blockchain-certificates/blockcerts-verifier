import { html } from '@polymer/lit-element';
import CSS from './_components.error-message-css';
import getText from '../../../i18n/getText';

function isMessageTranslatable (message) {
  return message.indexOf('.') > -1 && message.indexOf(' ') === -1;
}

function translate (message) {
  if (isMessageTranslatable(message)) {
    return getText(message);
  }
  return message;
}

export default function ErrorMessage (message, solidBackground = false) {
  if (message == null) {
    return null;
  }

  const classes = [
    'buv-c-error-message',
    'buv-qa-error-message',
    solidBackground ? 'buv-c-error-message--solid' : ''
  ].join(' ');

  return html`
    ${CSS}
    <p class$='${classes}'>
      <span class='buv-c-error-message-title'>${getText('errors.errorLabel')}</span>
      ${translate(message)}
    </p>`;
}
