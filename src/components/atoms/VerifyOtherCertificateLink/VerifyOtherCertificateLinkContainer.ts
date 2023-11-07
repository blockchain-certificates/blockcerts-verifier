import connector from '../../../store/connector';
import resetCertificateDefinition from '../../../actions/resetCertificateDefinition';
import type { VerifyOtherCertificateLinkProps } from './VerifyOtherCertificateLink';
import VerifyOtherCertificateLink from './VerifyOtherCertificateLink';
import { getCertificateDefinition } from '../../../selectors/certificate';
import type { BlockcertsVerifierState } from '../../../store/getInitialState';

export const mapDispatchToProps: VerifyOtherCertificateLinkProps = {
  onClick: resetCertificateDefinition
};

export const mapStateToProps = (state: BlockcertsVerifierState): VerifyOtherCertificateLinkProps => ({
  isVisible: !!getCertificateDefinition(state)
});

const VerifyOtherCertificateLinkContainer = connector(VerifyOtherCertificateLink, { mapDispatchToProps, mapStateToProps });
export default VerifyOtherCertificateLinkContainer;
