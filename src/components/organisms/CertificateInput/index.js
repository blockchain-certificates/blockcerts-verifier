import { html } from '@polymer/lit-element';
import Input from '../../atoms/Input';
import '../../molecules/Button';

import CSS from './_components.certificate-input-css';

const CertificateInput = html`
    ${CSS}
    <div class="buv-c-certificate-input">
        ${Input}<buv-button></buv-button>        
    </div>
`;

export default CertificateInput;