import { html } from '@polymer/lit-element';
import CSS from './_components.verify-button-css';
import getText from '../../../i18n/getText';
import type { TemplateResult } from 'lit-html';

export interface VerifyButtonProps {
  isHollow?: boolean;
  isDisabled?: boolean;
  onClick?: (e?: Event) => any;
  type?: string;
}

export default function VerifyButton ({ isHollow = false, isDisabled = false, onClick = (): any => {}, type = '' }: VerifyButtonProps = {}): TemplateResult {
  const buttonClass: string = [
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
