import connector from '../../../store/connector';
import FinalVerificationStep from './FinalVerificationStep';
import { getFinalStep } from '../../../selectors/certificate';

const mapStateToProps = (state) => ({
  finalStep: getFinalStep(state)
});

const ownProps = {
  chain: String,
  transactionLink: String,
  isTestChain: Boolean,
  isVisible: Boolean
};

const FinalVerificationStepContainer = connector(FinalVerificationStep, { mapStateToProps, ownProps });
export default FinalVerificationStepContainer;
