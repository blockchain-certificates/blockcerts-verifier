import connector from '../../../store/connector';
import VerificationModal from './VerificationModal';
import { getShowVerificationModal } from '../../../selectors/verification';
import showVerificationModal from '../../../actions/showVerificationModal';

export const mapStateToProps = (state) => ({
  isOpen: getShowVerificationModal(state)
});

export const mapDispatchToProps = {
  onClose: showVerificationModal.bind(null, false)
};

const VerificationModalContainer = connector(VerificationModal, { mapDispatchToProps, mapStateToProps });
export default VerificationModalContainer;
