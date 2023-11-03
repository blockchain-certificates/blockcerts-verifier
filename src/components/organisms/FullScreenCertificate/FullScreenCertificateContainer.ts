import connector from '../../../store/connector';
import type { IFullScreenCertificateAPI } from './FullScreenCertificate';
import { FullScreenCertificate } from './FullScreenCertificate';
import {
  getCertificateDefinition,
  getDisplayAsHTML,
  getRecipientName
} from '../../../selectors/certificate';
import resetCertificateDefinition from '../../../actions/resetCertificateDefinition';
import { getClickableUrls, getDisableDownloadPdf } from '../../../selectors/api';
import type { BlockcertsVerifierState } from '../../../store/getInitialState';

export const mapDispatchToProps: Partial<IFullScreenCertificateAPI> = {
  onClose: resetCertificateDefinition
};

export const mapStateToProps = (state: BlockcertsVerifierState): Partial<IFullScreenCertificateAPI> => ({
  recipientName: getRecipientName(state),
  hasCertificateDefinition: !!getCertificateDefinition(state),
  displayHTML: getDisplayAsHTML(state),
  clickableUrls: getClickableUrls(state),
  disableDownloadPdf: getDisableDownloadPdf(state)
});

const FullScreenCertificateContainer = connector(FullScreenCertificate, { mapDispatchToProps, mapStateToProps });
export { FullScreenCertificateContainer };
