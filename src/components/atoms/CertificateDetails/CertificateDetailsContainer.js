import connector from '../../../store/connector';
import CertificateDetails from './CertificateDetails';
import {
  getIssueDate,
  getIssuedOn,
  getIssuerLogo,
  getIssuerName,
  getIssuerPublicKey,
  getRecipientName,
  getTransactionId,
  getTransactionLink,
  getIssuerURL,
  getRecordLink
} from '../../../selectors/certificate';

export const mapStateToProps = (state) => ({
  recipientName: getRecipientName(state),
  issueDate: getIssueDate(state),
  issuedOn: getIssuedOn(state),
  issuerName: getIssuerName(state),
  issuerLogo: getIssuerLogo(state),
  transactionLink: getTransactionLink(state),
  transactionId: getTransactionId(state),
  issuerPublicKey: getIssuerPublicKey(state),
  issuerURL: getIssuerURL(state),
  recordLink: getRecordLink(state)
});

const ownProps = {
  direction: String,
  hideRecipientName: Boolean
};

const CertificateDetailsContainer = connector(CertificateDetails, { mapStateToProps, ownProps });
export default CertificateDetailsContainer;
