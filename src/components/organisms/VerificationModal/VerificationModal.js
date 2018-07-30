import { html, LitElement } from '@polymer/lit-element';
import '../../atoms/Modal';
import '../VerificationProcess';

class VerificationModal extends LitElement {
  _render () {
    return html`
      <buv-modal>
        <buv-card-certificate></buv-card-certificate>
        <buv-verification-process></buv-verification-process>
      </buv-modal>
    `;
  }
}

export default VerificationModal;
