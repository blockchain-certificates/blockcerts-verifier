import connector from '../../../store/connector';
import VerificationProcess from './VerificationProcess';
import { getStartedVerificationSteps, getTransactionLink } from '../../../selectors/certificate';

export const mapStateToProps = (state) => ({
  steps: getStartedVerificationSteps(state),
  transactionLink: getTransactionLink(state)
});

const VerificationProcessContainer = connector(VerificationProcess, { mapStateToProps });
export default VerificationProcessContainer;
