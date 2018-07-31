import connector from '../../../store/connector';
import VerificationProcess from './VerificationProcess';
import { getChain, getStartedVerificationSteps, getTransactionLink } from '../../../selectors/certificate';
import VERIFICATION_STATUS from '../../../constants/verificationStatus';

export const mapStateToProps = (state) => {
  const steps = getStartedVerificationSteps(state);
  const hasError = steps.some(s => s.status === VERIFICATION_STATUS.FAILURE);
  return {
    steps,
    transactionLink: getTransactionLink(state),
    chain: getChain(state),
    hasError
  };
};

const VerificationProcessContainer = connector(VerificationProcess, { mapStateToProps });
export default VerificationProcessContainer;
