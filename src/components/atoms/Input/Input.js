import { html } from '@polymer/lit-element';
import CSS from './_components.input-css';

const Input = ({ onInput = () => {}, isValid = true } = {}) => {
  const inputClass = `buv-c-input ${isValid ? '' : 'is-invalid'}`;

  return html`
    ${CSS}
    <label 
      for='certificate-json-url'
      class='buv-u-visually-hidden'>Enter the certificate URL</label>
    <input 
      type='text'
      id='certificate-json-url'
      placeholder='Certificate Url'
      class$='${inputClass}'
      on-input='${(e) => { onInput(e.target.value); }}'
    />
  `;
};

export default Input;
