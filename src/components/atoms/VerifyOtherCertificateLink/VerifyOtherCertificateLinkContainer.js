import connector from '../../../store/connector';
import resetCertificateDefinition from '../../../actions/resetCertificateDefinition';
import VerifyOtherCertificateLink from './VerifyOtherCertificateLink';
import { getCertificateDefinition } from '../../../selectors/certificate';

const mapDispatchToProps = {
  onClick: resetCertificateDefinition
};

const mapStateToProps = (state) => ({
  isVisible: getCertificateDefinition(state)
});

const VerifyOtherCertificateLinkContainer = connector(VerifyOtherCertificateLink, { mapDispatchToProps, mapStateToProps });
export default VerifyOtherCertificateLinkContainer;
