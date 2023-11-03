import connector from '../../../store/connector';
import type { VerificationModalProps } from './VerificationModal';
import VerificationModal from './VerificationModal';
import { getShowVerificationModal } from '../../../selectors/verification';
import showVerificationModal from '../../../actions/showVerificationModal';
import type { BlockcertsVerifierState } from '../../../store/getInitialState';

export const mapStateToProps = (state: BlockcertsVerifierState): VerificationModalProps => ({
  isOpen: getShowVerificationModal(state)
});

export const mapDispatchToProps: VerificationModalProps = {
  onClose: showVerificationModal.bind(null, false)
};

const VerificationModalContainer = connector(VerificationModal, { mapDispatchToProps, mapStateToProps });
export default VerificationModalContainer;
