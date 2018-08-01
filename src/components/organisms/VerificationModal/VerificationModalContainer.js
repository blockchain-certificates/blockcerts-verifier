import connector from '../../../store/connector';
import VerificationModal from './VerificationModal';
import { getVerificationHasStarted } from '../../../selectors/verification';
import resetVerificationStatus from '../../../actions/resetVerificationStatus';

export const mapStateToProps = (state) => ({
  isOpen: getVerificationHasStarted(state)
});

export const mapDispatchToProps = {
  onClose: resetVerificationStatus
};

const VerificationModalContainer = connector(VerificationModal, { mapDispatchToProps, mapStateToProps });
export default VerificationModalContainer;
