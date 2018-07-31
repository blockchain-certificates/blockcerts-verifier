import connector from '../../../store/connector';
import VerificationModal from './VerificationModal';
import { getVerificationHasStarted } from '../../../selectors/verification';

export const mapStateToProps = (state) => ({
  isOpen: getVerificationHasStarted(state)
});

const VerificationModalContainer = connector(VerificationModal, { mapStateToProps });
export default VerificationModalContainer;
