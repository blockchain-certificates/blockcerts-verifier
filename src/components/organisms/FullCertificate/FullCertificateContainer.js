import connector from '../../../store/connector';
import FullCertificate from './FullCertificate';
import {
  getCertificateDefinition,
  getDisplayHTML
} from '../../../selectors/certificate';

export const mapStateToProps = (state) => ({
  hasCertificateDefinition: !!getCertificateDefinition(state),
  displayHTML: getDisplayHTML(state)
});

const FullCertificateContainer = connector(FullCertificate, { mapStateToProps });
export default FullCertificateContainer;
