import connector from '../../../store/connector';
import VerificationModal from './VerificationModal';
import { getCertificateDefinition } from '../../../selectors/certificate';
import { getDisableAutoVerify, getDisableVerify } from '../../../selectors/api';

export const mapStateToProps = (state) => ({
  isOpen: !!getCertificateDefinition(state) && !getDisableVerify(state) && !getDisableAutoVerify(state)
});

const VerificationModalContainer = connector(VerificationModal, { mapStateToProps });
export default VerificationModalContainer;
