import connector from '../../../store/connector';
import type { FinalVerificationStepProps } from './FinalVerificationStep';
import FinalVerificationStep from './FinalVerificationStep';
import { getChain, getFinalStep, getTransactionLink, isTestChain } from '../../../selectors/certificate';
import { getVerificationStatus } from '../../../selectors/verification';
import type { BlockcertsVerifierState } from '../../../store/getInitialState';

export const mapStateToProps = (state: BlockcertsVerifierState): FinalVerificationStepProps => ({
  finalStep: getFinalStep(state),
  chain: getChain(state),
  transactionLink: getTransactionLink(state),
  isTestChain: isTestChain(state),
  status: getVerificationStatus(state)
});

const ownProps: FinalVerificationStepProps = {
  isVisible: Boolean as any,
  hideLink: Boolean as any,
  standalone: Boolean as any,
  isOverlay: Boolean as any
};

const FinalVerificationStepContainer = connector(FinalVerificationStep, { mapStateToProps, ownProps });
export default FinalVerificationStepContainer;
