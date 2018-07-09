import connector from '../../../store/connector';
import CardCertificate from './CardCertificate';
import { getJSONCertificate } from '../../../selectors/certificate';

const mapStateToProps = (state) => ({
  certificateDefinition: getJSONCertificate(state)
});

const CardCertificateContainer = connector(CardCertificate, { mapStateToProps });
export { CardCertificateContainer };
