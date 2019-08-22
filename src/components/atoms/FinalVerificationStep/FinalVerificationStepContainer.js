import connector from '../../../store/connector';
import FinalVerificationStep from './FinalVerificationStep';
import { getChain, getFinalStep, getTransactionLink, isTestChain } from '../../../selectors/certificate';
import { getVerificationStatus } from '../../../selectors/verification';

export const mapStateToProps = (state) => ({
  finalStep: getFinalStep(state),
  chain: getChain(state),
  transactionLink: getTransactionLink(state),
  isTestChain: isTestChain(state),
  status: getVerificationStatus(state)
});

const ownProps = {
  isVisible: Boolean,
  hideLink: Boolean,
  standalone: Boolean
};

const FinalVerificationStepContainer = connector(FinalVerificationStep, { mapStateToProps, ownProps });
export default FinalVerificationStepContainer;
