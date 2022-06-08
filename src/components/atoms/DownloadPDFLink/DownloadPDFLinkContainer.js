import connector from '../../../store/connector';
import resetCertificateDefinition from '../../../actions/resetCertificateDefinition';
import DownloadPDFLink from './DownloadPDFLink';
import { getCertificateDefinition } from '../../../selectors/certificate';

export const mapDispatchToProps = {
  onClick: resetCertificateDefinition
};

export const mapStateToProps = (state) => ({
  isVisible: !!getCertificateDefinition(state)
});

const ownProps = {
  display: String
};

const DownloadPDFLinkContainer = connector(DownloadPDFLink, { mapDispatchToProps, mapStateToProps, ownProps });
export default DownloadPDFLinkContainer;
