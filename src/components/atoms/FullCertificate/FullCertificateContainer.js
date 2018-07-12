import connector from '../../../store/connector';
import FullCertificate from './FullCertificate';
import { getCertificateDefinition } from '../../../selectors/certificate';

const mapStateToProps = (state) => ({
  hasCertificateDefinition: !!getCertificateDefinition(state)
});

const FullCertificateContainer = connector(FullCertificate, { mapStateToProps });
export { FullCertificateContainer };
