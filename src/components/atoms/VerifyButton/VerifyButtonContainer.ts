import connector from '../../../store/connector';
import VerifyButton, { VerifyButtonProps } from './VerifyButton';
import { getCertificateDefinition } from '../../../selectors/certificate';
import { getDisableVerify } from '../../../selectors/api';
import startVerificationProcess from '../../../actions/startVerificationProcess';
import type { BlockcertsVerifierState } from '../../../store/getInitialState';

export const mapDispatchToProps: VerifyButtonProps = {
  onClick: startVerificationProcess
};

export const mapStateToProps = (state: BlockcertsVerifierState): VerifyButtonProps => ({
  isDisabled: getDisableVerify(state) || !getCertificateDefinition(state)
});

const ownProps: VerifyButtonProps = {
  isHollow: Boolean as any,
  type: String as any
};

const VerifyButtonContainer = connector(VerifyButton, { mapDispatchToProps, mapStateToProps, ownProps });
export default VerifyButtonContainer;
