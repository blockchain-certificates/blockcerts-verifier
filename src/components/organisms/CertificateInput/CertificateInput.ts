import { html } from '@polymer/lit-element';
import '../../atoms/Input';
import '../../atoms/VerifyButton';

import CSS from './_components.certificate-input-css';
import type { TemplateResult } from 'lit-html';

export interface CertificateInputProps {
  showInput?: boolean;
}

const CertificateInput = ({ showInput = true }: CertificateInputProps): TemplateResult => {
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
