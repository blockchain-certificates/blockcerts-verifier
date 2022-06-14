import connector from '../../../store/connector';
import resetCertificateDefinition from '../../../actions/resetCertificateDefinition';
import DownloadPDFLink from './DownloadPDFLink';
import {
  getCertificateDefinition,
  getCertificateTitle,
  getDisplayAsHTML,
  getDisplayContent,
  getDisplayContentEncoding,
  getDisplayContentType,
  getIssueDate,
  getIssuedOn, getIssuerLogo,
  getIssuerName,
  getRecipientName, getRecordLink
} from '../../../selectors/certificate';

export const mapDispatchToProps = {
  onClick: resetCertificateDefinition
};

export const mapStateToProps = (state) => ({
  isVisible: !!getCertificateDefinition(state),
  contentType: getDisplayContentType(state),
  contentEncoding: getDisplayContentEncoding(state),
  content: getDisplayContent(state),
  displayHTML: getDisplayAsHTML(state),
  recipientName: getRecipientName(state),
  certificateTitle: getCertificateTitle(state),
  issueDate: getIssueDate(state),
  issuedOn: getIssuedOn(state),
  issuerName: getIssuerName(state),
  issuerLogo: getIssuerLogo(state),
  recordLink: getRecordLink(state)
});

const ownProps = {
  display: String
};

const DownloadPDFLinkContainer = connector(DownloadPDFLink, { mapDispatchToProps, mapStateToProps, ownProps });
export default DownloadPDFLinkContainer;
