import connector from '../../../store/connector';
import VerificationProcess from './VerificationProcess';
import {
  getVerifiedSteps,
  isTestChain
} from '../../../selectors/certificate';
import VERIFICATION_STATUS from '../../../constants/verificationStatus';

export const mapStateToProps = (state) => {
  const steps = JSON.parse(JSON.stringify(getVerifiedSteps(state)));
  const hasError = steps.some(s => s.status === VERIFICATION_STATUS.FAILURE);
  return {
    steps,
    isTestChain: isTestChain(state),
    hasError
  };
};

const VerificationProcessContainer = connector(VerificationProcess, { mapStateToProps });
export default VerificationProcessContainer;
