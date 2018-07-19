import { html } from '@polymer/lit-element';
import '../../atoms/Input';
import '../../atoms/FileUpload';
import '../../molecules/Button';

import CSS from './_components.certificate-input-css';

const CertificateInput = ({ showInput = true }) => {
  if (!showInput) {
    return null;
  }

  return html`
    ${CSS}
    <section class="buv-c-certificate-input">
        <buv-input class="buv-c-certificate-input__input"></buv-input><buv-button></buv-button>     
    </section>
    <buv-file-upload></buv-file-upload>   
`;
};

export default CertificateInput;
