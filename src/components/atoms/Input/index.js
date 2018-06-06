import { html } from '@polymer/lit-element';
import CSS from './_components.input-css';

const Input = html`
    ${CSS}
    <label 
      for='certificate-json-url'
      class='buv-u-visually-hidden'>Enter the certificate URL</label>
    <input 
      type='text'
      id='certificate-json-url'
      placeholder='Credential URL'
      class='buv-c-input'
    />
  `;

export default Input;
