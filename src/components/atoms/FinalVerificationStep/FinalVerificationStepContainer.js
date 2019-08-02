import connector from '../../../store/connector';
import FinalVerificationStep from './FinalVerificationStep';
import { getChain, getFinalStep, getTransactionLink, isTestChain } from '../../../selectors/certificate';

export const mapStateToProps = (state) => ({
  finalStep: getFinalStep(state),
  chain: getChain(state),
  transactionLink: getTransactionLink(state),
  isTestChain: isTestChain(state)
});

const ownProps = {
  isVisible: Boolean
};

const FinalVerificationStepContainer = connector(FinalVerificationStep, { mapStateToProps, ownProps });
export default FinalVerificationStepContainer;
