import { html } from '@polymer/lit-element';
import CSS from './_components.file-upload-css';

export default function FileUpload ({ onChange = () => {}, hideFileUpload = false }) {
  if (hideFileUpload) {
    return null;
  }

  return html`
    ${CSS}
    <label for='buv-json-file-upload' class='buv-o-link  buv-o-text-12'>
      <span class='buv-o-link__text--underline'>Choose JSON file</span>
      <input
        type='file'
        accept='application/json'
        id='buv-json-file-upload'
        class='buv-u-visually-hidden'
        onchange='${(e) => { onChange(e.target.files[0]); }}'
      />
    </label>
    <span class="buv-o-text-12">(you can also drag & drop your file).</span>`;
}
