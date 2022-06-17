import connector from '../../../store/connector';
import CardCertificate from './CardCertificate';
import {
  getCertificateDefinition,
  getCertificateTitle,
  getIssueDate,
  getIssuedOn,
  getIssuerLogo,
  getIssuerName,
  getRecipientName,
  getRecordLink
} from '../../../selectors/certificate';
import { getDisableDownloadPdf } from '../../../selectors/api';

const mapStateToProps = (state) => ({
  hasCertificateDefinition: !!getCertificateDefinition(state),
  recipientName: getRecipientName(state),
  certificateTitle: getCertificateTitle(state),
  issueDate: getIssueDate(state),
  issuedOn: getIssuedOn(state),
  issuerName: getIssuerName(state),
  issuerLogo: getIssuerLogo(state),
  recordLink: getRecordLink(state),
  disableDownloadPdf: getDisableDownloadPdf(state)
});

const ownProps = {
  hideRecordLink: Boolean,
  hideVerifyButton: Boolean
};

const CardCertificateContainer = connector(CardCertificate, { mapStateToProps, ownProps });
export default CardCertificateContainer;
