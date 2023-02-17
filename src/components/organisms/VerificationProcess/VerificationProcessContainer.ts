import connector from '../../../store/connector';
import VerificationProcess, { IVerificationProcessAPI } from './VerificationProcess';
import {
  getHasError,
  getVerifiedSteps,
  isTestChain
} from '../../../selectors/certificate';
import type { BlockcertsVerifierState } from '../../../store/getInitialState';

export const mapStateToProps = (state: BlockcertsVerifierState): IVerificationProcessAPI => {
  return {
    steps: JSON.parse(JSON.stringify(getVerifiedSteps(state))),
    isTestChain: isTestChain(state),
    hasError: getHasError(state)
  };
};

const VerificationProcessContainer = connector(VerificationProcess, { mapStateToProps });
export default VerificationProcessContainer;
