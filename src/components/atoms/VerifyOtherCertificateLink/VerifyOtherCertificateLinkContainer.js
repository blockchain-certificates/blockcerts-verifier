import connector from '../../../store/connector';
import resetCertificateDefinition from '../../../actions/resetCertificateDefinition';
import VerifyOtherCertificateLink from './VerifyOtherCertificateLink';
import { getCertificateDefinition } from '../../../selectors/certificate';

export const mapDispatchToProps = {
  onClick: resetCertificateDefinition
};

export const mapStateToProps = (state) => ({
  isVisible: !!getCertificateDefinition(state)
});

const VerifyOtherCertificateLinkContainer = connector(VerifyOtherCertificateLink, { mapDispatchToProps, mapStateToProps });
export default VerifyOtherCertificateLinkContainer;
