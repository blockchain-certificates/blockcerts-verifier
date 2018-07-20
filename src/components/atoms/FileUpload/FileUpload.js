import { html } from '@polymer/lit-element';
import CSS from './_components.file-upload-css';

export default function FileUpload ({ onChange = () => {} }) {
  return html`
    ${CSS}
    <label for='buv-json-file-upload' class='buv-o-link  buv-o-small-text'>
        Or choose JSON file
        <input
          type='file'
          accept='application/json'
          id='buv-json-file-upload'
          class='buv-u-visually-hidden'
          onchange='${(e) => { onChange(e.target.files[0]); }}'
        />
    </label>`;
}
