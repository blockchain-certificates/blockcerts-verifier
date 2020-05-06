import connector from '../../../store/connector';
import FullScreenCertificate, { IFullScreenCertificateAPI } from './FullScreenCertificate';
import {
  getCertificateDefinition,
  getDisplayHTML,
  getRecipientName
} from '../../../selectors/certificate';
import resetCertificateDefinition from '../../../actions/resetCertificateDefinition';

export const mapDispatchToProps: Partial<IFullScreenCertificateAPI> = {
  onClose: resetCertificateDefinition
};

export const mapStateToProps = (state): Partial<IFullScreenCertificateAPI> => ({
  recipientName: getRecipientName(state),
  hasCertificateDefinition: !!getCertificateDefinition(state),
  displayHTML: getDisplayHTML(state)
});

const FullScreenCertificateContainer = connector(FullScreenCertificate, { mapDispatchToProps, mapStateToProps });
export { FullScreenCertificateContainer };
