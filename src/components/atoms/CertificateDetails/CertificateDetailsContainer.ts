import connector from '../../../store/connector';
import CertificateDetails, { ICertificateDetailsApi } from './CertificateDetails';
import {
  getIssueDate,
  getIssuedOn,
  getIssuerName,
  getIssuerPublicKey,
  getRecipientName,
  getTransactionId,
  getTransactionLink
} from '../../../selectors/certificate';

export const mapStateToProps = (state): ICertificateDetailsApi => ({
  recipientName: getRecipientName(state),
  issueDate: getIssueDate(state),
  issuedOn: getIssuedOn(state),
  issuerName: getIssuerName(state),
  transactionLink: getTransactionLink(state),
  transactionId: getTransactionId(state),
  issuerPublicKey: getIssuerPublicKey(state)
});

const ownProps = {
  direction: String,
  hideRecipientName: Boolean
};

const CertificateDetailsContainer = connector(CertificateDetails, { mapStateToProps, ownProps });
export default CertificateDetailsContainer;
