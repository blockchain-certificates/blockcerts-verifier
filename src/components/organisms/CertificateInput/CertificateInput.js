import { html } from '@polymer/lit-element';
import '../../atoms/Input';
import '../../atoms/DragAndDrop';
import '../../atoms/FileUpload';
import '../../molecules/VerifyButton';

import CSS from './_components.certificate-input-css';

const CertificateInput = ({ showInput = true }) => {
  if (!showInput) {
    return null;
  }

  return html`
    ${CSS}
    <buv-drag-and-drop>
      <section class="buv-c-certificate-input">
          <buv-input class="buv-c-certificate-input__input"></buv-input><buv-verify-button></buv-verify-button>     
      </section>
    </buv-drag-and-drop>
    <buv-file-upload></buv-file-upload>   
`;
};

export default CertificateInput;
