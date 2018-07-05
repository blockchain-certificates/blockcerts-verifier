import connector from '../store/connector';
import { BlockcertsUniversalVerifier, SourceComponent } from './BlockcertsUniversalVerifier';

const mapDispatchToProps = {
  onLoad: () => {}
};

const ownProps = SourceComponent.properties;

const BlockcertsUniversalVerifierContainer = connector(BlockcertsUniversalVerifier, { mapDispatchToProps, ownProps });
export { BlockcertsUniversalVerifierContainer };
