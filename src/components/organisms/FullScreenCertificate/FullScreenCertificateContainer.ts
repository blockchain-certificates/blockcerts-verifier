import connector from '../../../store/connector';
import FullScreenCertificate, { IFullScreenCertificateAPI } from './FullScreenCertificate';
import {
  getCertificateDefinition,
  getDisplayAsHTML,
  getRecipientName
} from '../../../selectors/certificate';
import resetCertificateDefinition from '../../../actions/resetCertificateDefinition';
import { getClickableUrls, getDisableDownloadPdf } from '../../../selectors/api';

export const mapDispatchToProps: Partial<IFullScreenCertificateAPI> = {
  onClose: resetCertificateDefinition
};

export const mapStateToProps = (state): Partial<IFullScreenCertificateAPI> => ({
  recipientName: getRecipientName(state),
  hasCertificateDefinition: !!getCertificateDefinition(state),
  displayHTML: getDisplayAsHTML(state),
  clickableUrls: getClickableUrls(state),
  disableDownloadPdf: getDisableDownloadPdf(state)
});

const FullScreenCertificateContainer = connector(FullScreenCertificate, { mapDispatchToProps, mapStateToProps });
export { FullScreenCertificateContainer };
