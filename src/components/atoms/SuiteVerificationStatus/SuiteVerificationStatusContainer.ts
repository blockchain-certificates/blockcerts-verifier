import connector from '../../../store/connector';
import SuiteVerificationStatus, { ISuiteVerificationStatus } from './SuiteVerificationStatus';
import { isTestChainAtIndex } from '../../../selectors/certificate';
import { getVerificationStatusForSuite } from '../../../selectors/verification';

const mapStateToProps = (state, ownProps): ISuiteVerificationStatus => {
  return {
    isTestChain: isTestChainAtIndex(state, parseInt(ownProps.index, 10)),
    status: getVerificationStatusForSuite(state, ownProps.suiteType)
  };
};

const ownProps = {
  suiteType: String,
  index: String
};

const SuiteVerificationStatusContainer = connector<any, ISuiteVerificationStatus, any>(
  SuiteVerificationStatus,
  { mapStateToProps, ownProps }
);
export default SuiteVerificationStatusContainer;
