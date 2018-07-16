import connector from '../../../store/connector';
import FullCertificate from './FullCertificate';
import {
  getCertificateDefinition,
  getDisplayHTML,
  getIssueDate,
  getIssuedOn,
  getIssuerLogo,
  getIssuerName,
  getRecipientName,
  getTransactionLink
} from '../../../selectors/certificate';

const mapStateToProps = (state) => ({
  hasCertificateDefinition: !!getCertificateDefinition(state),
  displayHTML: getDisplayHTML(state),
  recipientName: getRecipientName(state),
  issueDate: getIssueDate(state),
  issuedOn: getIssuedOn(state),
  issuerName: getIssuerName(state),
  issuerLogo: getIssuerLogo(state),
  transactionLink: getTransactionLink(state),
});

const FullCertificateContainer = connector(FullCertificate, { mapStateToProps });
export { FullCertificateContainer };
