import { html } from '@polymer/lit-element';
import Input from '../../atoms/Input';
import '../../molecules/Button';

const CertificateInput = html`
  ${Input}<buv-button></buv-button>
`;

export default CertificateInput;