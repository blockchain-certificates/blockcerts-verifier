import connector from '../../../store/connector';
import FullScreenCertificate from './FullScreenCertificate';
import {
  getCertificateDefinition,
  getDisplayHTML,
  getRecipientName
} from '../../../selectors/certificate';
import resetCertificateDefinition from '../../../actions/resetCertificateDefinition';

const mapDispatchToProps = {
  onClose: resetCertificateDefinition
};

export const mapStateToProps = (state) => ({
  recipientName: getRecipientName(state),
  hasCertificateDefinition: !!getCertificateDefinition(state),
  displayHTML: getDisplayHTML(state)
});

const FullScreenCertificateContainer = connector(FullScreenCertificate, { mapDispatchToProps, mapStateToProps });
export { FullScreenCertificateContainer };
