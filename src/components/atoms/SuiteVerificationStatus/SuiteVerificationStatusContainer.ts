import connector from '../../../store/connector';
import SuiteVerificationStatus, { ISuiteVerificationStatus } from './SuiteVerificationStatus';
import { isTestChain } from '../../../selectors/certificate';
import { getVerificationStatusForSuite } from '../../../selectors/verification';

const mapStateToProps = (state, ownProps): ISuiteVerificationStatus => {
  return {
    isTestChain: isTestChain(state),
    status: getVerificationStatusForSuite(state, ownProps.suiteType)
  };
};

const ownProps = {
  suiteType: String
};

const SuiteVerificationStatusContainer = connector<any, ISuiteVerificationStatus, any>(
  SuiteVerificationStatus,
  { mapStateToProps, ownProps }
);
export default SuiteVerificationStatusContainer;
