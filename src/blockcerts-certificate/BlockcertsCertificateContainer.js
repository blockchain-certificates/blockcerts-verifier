import connector from '../store/connector';
import initialize from '../actions/initialize';
import { BlockcertsCertificate, SourceComponent } from './BlockcertsCertificate';
import { getErrorMessage } from '../selectors/error';
import { APIKeys } from '../models/API';
import { getCertificateDefinition } from '../selectors/certificate';

const mapDispatchToProps = {
  onLoad: initialize
};

const mapStateToProps = (state) => {
  return {
    errorMessage: getErrorMessage(state),
    hasCertificate: !!getCertificateDefinition(state)
  };
};

const ownProps = {
  ...SourceComponent.properties,
  // make polymer detect external API value
  ...APIKeys
};

const BlockcertsCertificateContainer = connector(BlockcertsCertificate, { mapDispatchToProps, mapStateToProps, ownProps });
export { BlockcertsCertificateContainer };
