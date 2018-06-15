import { html } from '@polymer/lit-element';
import CSS from './_components.input-css';

const Input = ({ onInput = () => {} } = {}) => {
  return html`
    ${CSS}
    <label 
      for='certificate-json-url'
      class='buv-u-visually-hidden'>Enter the certificate URL</label>
    <input 
      type='text'
      id='certificate-json-url'
      placeholder='Certificate Url'
      class='buv-c-input is-invalid'
      on-input='${(e) => { onInput(e.target.value); }}'
    />
  `;
};

export default Input;
