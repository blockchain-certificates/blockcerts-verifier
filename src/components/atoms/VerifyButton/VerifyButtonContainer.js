import connector from '../../../store/connector';
import VerifyButton from './VerifyButton';
import { getCertificateDefinition } from '../../../selectors/certificate';
import { getDisableVerify } from '../../../selectors/api';
import startVerificationProcess from '../../../actions/startVerificationProcess';

export const mapDispatchToProps = {
  onClick: startVerificationProcess
};

export const mapStateToProps = (state) => ({
  isDisabled: getDisableVerify(state) || !getCertificateDefinition(state)
});

const ownProps = {
  isHollow: Boolean,
  type: String
};

const VerifyButtonContainer = connector(VerifyButton, { mapDispatchToProps, mapStateToProps, ownProps });
export default VerifyButtonContainer;
