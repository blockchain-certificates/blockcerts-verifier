import { html } from '@polymer/lit-element';
import CSS from './_components.input-css';
import getText from '../../../i18n/getText';

export interface InputProps {
  onInput?: (value: string) => any;
  isValid?: boolean;
}

const Input = ({ onInput = () => {}, isValid = true }: InputProps = {}) => {
  // TODO: better handle this dynamic class (cf npm classnames)
  const inputClass = `buv-c-input ${isValid ? '' : 'is-invalid'}`;

  return html`
    ${CSS}
    <label 
      for='certificate-json-url'
      class='buv-u-visually-hidden'>${getText('text.urlInput')}</label>
    <input 
      type='text'
      id='certificate-json-url'
      placeholder='${getText('text.urlInputPlaceholder')}'
      class$='${inputClass}'
      on-input='${(e) => { onInput(e.target.value); }}'
    />
  `;
};

export default Input;
