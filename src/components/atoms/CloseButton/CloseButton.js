import { html } from '@polymer/lit-element';
import CSS from './_components.close-button-css';

const CloseButton = ({ onClick = () => {}, className = '' } = {}) => {
  const classes = `buv-c-close-button  buv-c-close-button--hairline  ${className || 'buv-c-close-button--position'} `;
  return html`
    ${CSS}
    <button onclick='${onClick}' class$='${classes}'>
      <label class='buv-u-visually-hidden'>Click to close</label>
    </button>
  `;
};

export default CloseButton;
