import connector from '../../../store/connector';
import VerificationProcess from './VerificationProcess';
import { getVerifiedSteps } from '../../../selectors/certificate';

export const mapStateToProps = (state) => ({
  steps: getVerifiedSteps(state)
});

const VerificationProcessContainer = connector(VerificationProcess, { mapStateToProps });
export default VerificationProcessContainer;
