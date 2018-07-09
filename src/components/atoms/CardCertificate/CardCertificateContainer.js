import connector from '../../../store/connector';
import CardCertificate from './CardCertificate';
import { getCertificateDefinition } from '../../../selectors/certificate';

const mapStateToProps = (state) => ({
  certificateDefinition: getCertificateDefinition(state),
});

const CardCertificateContainer = connector(CardCertificate, { mapStateToProps });
export { CardCertificateContainer };
