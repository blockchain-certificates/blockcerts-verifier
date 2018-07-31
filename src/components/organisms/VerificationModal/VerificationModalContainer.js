import connector from '../../../store/connector';
import VerificationModal from './VerificationModal';
import { getVerificationStatus } from '../../../selectors/verification';
import VERIFICATION_STATUS from '../../../constants/verificationStatus';

export const mapStateToProps = (state) => ({
  isOpen: getVerificationStatus(state) === VERIFICATION_STATUS.STARTED
});

const VerificationModalContainer = connector(VerificationModal, { mapStateToProps });
export default VerificationModalContainer;
