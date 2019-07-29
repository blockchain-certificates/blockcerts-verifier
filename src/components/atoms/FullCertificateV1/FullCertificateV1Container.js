import connector from '../../../store/connector';
import FullCertificateV1 from './FullCertificateV1';
import {
  getCertificateDefinition,
  getCertificateDescription,
  getCertificateImage,
  getCertificateSeal,
  getCertificateSignatures,
  getCertificateSubtitle,
  getCertificateTitle,
  getIssuerName,
  getRecipientName
} from '../../../selectors/certificate';

export const mapStateToProps = (state) => ({
  hasCertificateDefinition: !!getCertificateDefinition(state),
  certificateImage: getCertificateImage(state),
  certificateTitle: getCertificateTitle(state),
  certificateSubtitle: getCertificateSubtitle(state),
  certificateDescription: getCertificateDescription(state),
  certificateSeal: getCertificateSeal(state),
  certificateSignatures: getCertificateSignatures(state),
  recipientName: getRecipientName(state),
  issuerName: getIssuerName(state)
});

const FullCertificateV1Container = connector(FullCertificateV1, { mapStateToProps });
export default FullCertificateV1Container;
