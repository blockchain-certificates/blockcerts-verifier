import { html } from '@polymer/lit-element';
import '../../atoms/Input';
import '../../molecules/Button';

import CSS from './_components.certificate-input-css';

const CertificateInput = html`
    ${CSS}
    <div class="buv-c-certificate-input">
        <buv-input class="buv-c-certificate-input__input"></buv-input><buv-button></buv-button>        
    </div>
`;

export default CertificateInput;
