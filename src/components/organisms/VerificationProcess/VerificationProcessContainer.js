import connector from '../../../store/connector';
import VerificationProcess from './VerificationProcess';
import { getChain, getStartedVerificationSteps, getTransactionLink } from '../../../selectors/certificate';

export const mapStateToProps = (state) => ({
  steps: getStartedVerificationSteps(state),
  transactionLink: getTransactionLink(state),
  chain: getChain(state)
});

const VerificationProcessContainer = connector(VerificationProcess, { mapStateToProps });
export default VerificationProcessContainer;
