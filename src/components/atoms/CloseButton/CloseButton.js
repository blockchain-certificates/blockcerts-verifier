import { html } from '@polymer/lit-element';
import CSS from './_components.close-button-css';
import getText from '../../../i18n/getText';

const CloseButton = ({ onClick = () => {}, className = '' } = {}) => {
  const classes = `buv-c-close-button  buv-c-close-button--hairline  ${className || 'buv-c-close-button--position'} `;
  return html`
    ${CSS}
    <button onclick='${onClick}' class$='${classes}'>
      <label class='buv-u-visually-hidden'>${getText('text.closeButton')}</label>
    </button>
  `;
};

export default CloseButton;
