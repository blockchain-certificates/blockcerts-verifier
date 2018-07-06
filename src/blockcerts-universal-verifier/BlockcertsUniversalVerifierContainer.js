import connector from '../store/connector';
import updateCertificateUrl from '../actions/updateCertificateUrl';
import { BlockcertsUniversalVerifier, SourceComponent } from './BlockcertsUniversalVerifier';
import { getErrorMessage } from '../selectors/error';

const mapDispatchToProps = {
  onLoad: updateCertificateUrl
};

const mapStateToProps = (state) => {
  return {
    errorMessage: getErrorMessage(state)
  }
};

const ownProps = SourceComponent.properties;

const BlockcertsUniversalVerifierContainer = connector(BlockcertsUniversalVerifier, { mapDispatchToProps, mapStateToProps, ownProps });
export { BlockcertsUniversalVerifierContainer };
