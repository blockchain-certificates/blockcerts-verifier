import verifyCertificate from '../../../actions/verifyCertificate';
import connector from '../../../store/connector';
import { VerifyButton } from './VerifyButton';
import { getUrlIsValid } from '../../../selectors/input';
import { getCertificateDefinition } from '../../../selectors/certificate';
import { getDisableVerify } from '../../../selectors/api';

const mapDispatchToProps = {
  onClick: verifyCertificate
};

export const mapStateToProps = (state) => ({
  cancelSpinner: !getUrlIsValid(state),
  isDisabled: getDisableVerify(state) || !getCertificateDefinition(state)
});

const ownProps = {
  isHollow: Boolean
};

const VerifyButtonContainer = connector(VerifyButton, { mapDispatchToProps, mapStateToProps, ownProps });
export default VerifyButtonContainer;
