import connector from '../../../store/connector';
import FullCertificateV1 from './FullCertificateV1';
import {
  getCertificateDefinition,
  getCertificateImage,
  getIssueDate,
  getIssuedOn,
  getIssuerLogo,
  getIssuerName,
  getRecipientName,
  getTransactionId,
  getTransactionLink
} from '../../../selectors/certificate';

export const mapStateToProps = (state) => ({
  hasCertificateDefinition: !!getCertificateDefinition(state),
  certificateImage: getCertificateImage(state),
  recipientName: getRecipientName(state),
  issueDate: getIssueDate(state),
  issuedOn: getIssuedOn(state),
  issuerName: getIssuerName(state),
  issuerLogo: getIssuerLogo(state),
  transactionLink: getTransactionLink(state),
  transactionId: getTransactionId(state)
});

const FullCertificateV1Container = connector(FullCertificateV1, { mapStateToProps });
export { FullCertificateV1Container };
