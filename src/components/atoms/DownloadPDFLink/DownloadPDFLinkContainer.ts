import connector from '../../../store/connector';
import { DownloadPDFLink } from './DownloadPDFLink';
import {
  getCertificateDefinition,
  getCertificateTitle,
  getDisplayContent,
  getDisplayContentEncoding,
  getDisplayContentType,
  getIssueDate,
  getIssuerLogo,
  getIssuerName,
  getIssuerPublicKey,
  getRecipientName,
  getRecordLink
} from '../../../selectors/certificate';

export const mapStateToProps = (state) => ({
  isVisible: !!getCertificateDefinition(state),
  contentType: getDisplayContentType(state),
  contentEncoding: getDisplayContentEncoding(state),
  content: getDisplayContent(state),
  recipientName: getRecipientName(state),
  certificateTitle: getCertificateTitle(state),
  issueDate: getIssueDate(state),
  issuerName: getIssuerName(state),
  issuerLogo: getIssuerLogo(state),
  recordLink: getRecordLink(state),
  issuerPublicKey: getIssuerPublicKey(state)
});

const ownProps = {
  display: String
};

const DownloadPDFLinkContainer = connector(
  DownloadPDFLink,
  { mapStateToProps, ownProps }
);
export default DownloadPDFLinkContainer;
