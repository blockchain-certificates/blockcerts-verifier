import { html } from '@polymer/lit-element';
import CSS from './_components.verification-modal-css';
import '../../molecules/Modal';
import '../VerificationProcess';

function VerificationModal ({ isOpen, onClose }) {
  return html`
    ${CSS}
    <buv-modal isOpen?='${isOpen}' onClose='${onClose}'>
      <buv-card-certificate class='buv-c-verification-modal__certificate' hideRecordLink hideVerifyButton></buv-card-certificate>
      <hr class='buv-c-verification-modal__separator'/>
      <buv-verification-process class='buv-c-verification-modal__process'></buv-verification-process>
    </buv-modal>
  `;
}

export default VerificationModal;
