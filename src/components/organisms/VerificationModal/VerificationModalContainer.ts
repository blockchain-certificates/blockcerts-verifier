import connector from '../../../store/connector';
import VerificationModal, { VerificationModalProps } from './VerificationModal';
import { getShowVerificationModal } from '../../../selectors/verification';
import showVerificationModal from '../../../actions/showVerificationModal';
import { BlockcertsVerifierState } from '../../../store/getInitialState';

export const mapStateToProps = (state: BlockcertsVerifierState): VerificationModalProps => ({
  isOpen: getShowVerificationModal(state)
});

export const mapDispatchToProps: VerificationModalProps = {
  onClose: showVerificationModal.bind(null, false)
};

const VerificationModalContainer = connector(VerificationModal, { mapDispatchToProps, mapStateToProps });
export default VerificationModalContainer;
