import connector from '../store/connector';
import updateCertificateUrl from '../actions/updateCertificateUrl';
import { BlockcertsUniversalVerifier, SourceComponent } from './BlockcertsUniversalVerifier';

const mapDispatchToProps = {
  onLoad: updateCertificateUrl
};

const ownProps = SourceComponent.properties;

const BlockcertsUniversalVerifierContainer = connector(BlockcertsUniversalVerifier, { mapDispatchToProps, ownProps });
export { BlockcertsUniversalVerifierContainer };
