import { html } from '@polymer/lit-element';
import CSS from './_components.file-upload-css';

export default function FileUpload ({ onChange = () => {} }) {
  return html`
    ${CSS}
    <label for='buv-json-file-upload' class='buv-c-file-upload'>
        Choose JSON file
        <input
          type='file'
          accept='application/json'
          id='buv-json-file-upload'
          class='buv-u-visually-hidden'
          onchange='${(e) => { console.log(e.target.files); onChange(e.target.files[0]); }}'
        />
    </label>`;
}
