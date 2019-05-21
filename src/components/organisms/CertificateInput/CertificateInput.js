import { html } from '@polymer/lit-element';
import '../../atoms/Input';
import '../../molecules/VerifyButton';

import CSS from './_components.certificate-input-css';

const CertificateInput = ({ showInput = true }) => {
  if (!showInput) {
    return null;
  }

  return html`
    ${CSS}
    <section class="buv-c-certificate-input  buv-qa-certificate-input">
        <buv-input class="buv-c-certificate-input__input"></buv-input><buv-verify-button></buv-verify-button>     
    </section>
`;
};

export default CertificateInput;
