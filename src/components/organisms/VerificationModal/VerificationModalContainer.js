import connector from '../../../store/connector';
import VerificationModal from './VerificationModal';
import { getShowVerificationModal } from '../../../selectors/verification';
import resetVerificationStatus from '../../../actions/resetVerificationStatus';

export const mapStateToProps = (state) => ({
  isOpen: getShowVerificationModal(state)
});

export const mapDispatchToProps = {
  onClose: resetVerificationStatus
};

const VerificationModalContainer = connector(VerificationModal, { mapDispatchToProps, mapStateToProps });
export default VerificationModalContainer;
