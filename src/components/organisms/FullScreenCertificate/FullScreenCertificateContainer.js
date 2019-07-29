import connector from '../../../store/connector';
import FullScreenCertificate from './FullScreenCertificate';
import {
  getCertificateDefinition,
  getDisplayHTML, getRecipientName
} from '../../../selectors/certificate';

export const mapStateToProps = (state) => ({
  recipientName: getRecipientName(state),
  hasCertificateDefinition: !!getCertificateDefinition(state),
  displayHTML: getDisplayHTML(state)
});

const FullScreenCertificateContainer = connector(FullScreenCertificate, { mapStateToProps });
export { FullScreenCertificateContainer };
