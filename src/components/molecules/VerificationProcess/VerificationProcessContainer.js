import connector from '../../../store/connector';
import VerificationProcess from './VerificationProcess';
import { getStartedVerificationSteps } from '../../../selectors/certificate';

export const mapStateToProps = (state) => ({
  steps: getStartedVerificationSteps(state)
});

const VerificationProcessContainer = connector(VerificationProcess, { mapStateToProps });
export default VerificationProcessContainer;
