import { html } from '@polymer/lit-element';
import CSS from './_components.file-upload-css';

export default function FileUpload () {
  return html`
    ${CSS}
    <label for='buv-json-file-upload' class='buv-c-file-upload'>
        Choose JSON file
        <input type='file' accept='application/json' id='buv-json-file-upload' class='buv-u-visually-hidden'/>
    </label>`;
}
