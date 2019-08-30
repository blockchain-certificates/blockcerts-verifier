import { html } from '@polymer/lit-element';
import CSS from './_components.verify-button-css';
import getText from '../../../i18n/getText';

export default function VerifyButton ({ isHollow = false, isDisabled = false, onClick = () => {}, type = '' } = {}) {
  const buttonClass = [
    'buv-c-verify-button',
    isHollow ? 'buv-c-verify-button--hollow' : '',
    isDisabled ? 'is-disabled' : '',
    type === 'link' ? 'buv-c-verify-button--link' : ''
  ].join(' ');

  return html`
    ${CSS}
    <button class$='${buttonClass}' on-click='${onClick}' disabled?='${isDisabled}'>
      <label class='buv-c-verify-button__label'><slot>${getText('text.verify')}</slot></label>
    </button>
  `;
}
