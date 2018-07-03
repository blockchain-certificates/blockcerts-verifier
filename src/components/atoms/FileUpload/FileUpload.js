import { html } from '@polymer/lit-element';

export default function FileUpload () {
  return html`
    <label for='buv-json-file-upload'>
        Choose JSON file
        <input type='file' accept='application/json' id='buv-json-file-upload' class='buv-u-visually-hidden'/>
    </label>`;
}
