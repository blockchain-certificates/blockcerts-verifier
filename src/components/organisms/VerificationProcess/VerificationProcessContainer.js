import connector from '../../../store/connector';
import VerificationProcess from './VerificationProcess';
import {
  getHasError,
  getVerifiedSteps,
  isTestChain
} from '../../../selectors/certificate';

export const mapStateToProps = (state) => {
  return {
    steps: JSON.parse(JSON.stringify(getVerifiedSteps(state))),
    isTestChain: isTestChain(state),
    hasError: getHasError(state)
  };
};

const VerificationProcessContainer = connector(VerificationProcess, { mapStateToProps });
export default VerificationProcessContainer;
