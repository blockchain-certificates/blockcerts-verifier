import connector from '../store/connector';
import { BlockcertsUniversalVerifier } from './BlockcertsUniversalVerifier';

const mapDispatchToProps = {
  onLoad: () => {}
};

const BlockcertsUniversalVerifierContainer = connector(BlockcertsUniversalVerifier, { mapDispatchToProps });
export { BlockcertsUniversalVerifierContainer };
