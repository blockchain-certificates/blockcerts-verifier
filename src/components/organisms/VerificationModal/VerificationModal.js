import { html, LitElement } from '@polymer/lit-element';
import CSS from './_components.verification-modal-css';
import '../../atoms/Modal';
import '../VerificationProcess';

class VerificationModal extends LitElement {
  _render () {
    return html`
      ${CSS}
      <buv-modal>
        <buv-card-certificate class='buv-c-verification-modal__certificate' hideRecordLink></buv-card-certificate>
        <buv-verification-process class='buv-c-verification-modal__process'></buv-verification-process>
      </buv-modal>
    `;
  }
}

export default VerificationModal;
