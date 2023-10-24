import { html } from '@polymer/lit-element';
import CSS from './_components.verification-modal-css';
import '../../molecules/Footer';
import '../../molecules/Modal';
import '../VerificationProcess';
import { TemplateResult } from 'lit-html';

export interface VerificationModalProps {
  isOpen?: boolean;
  onClose?: (e?: Event) => any;
}

function VerificationModal ({ isOpen, onClose }: VerificationModalProps): TemplateResult {
  return html`
    ${CSS}
    <buv-modal isOpen?='${isOpen}' onClose='${onClose}' class$="qa-isopen-${isOpen}">
      <div class='buv-c-verification-modal__content'>
        <buv-card-certificate class='buv-c-verification-modal__certificate' hideRecordLink hideVerifyButton></buv-card-certificate>
        <hr class='buv-c-verification-modal__separator'/>
        <buv-verification-process class='buv-c-verification-modal__process'></buv-verification-process>
      </div>
      <buv-footer forceInPlace></buv-footer>
    </buv-modal>
  `;
}

export default VerificationModal;
