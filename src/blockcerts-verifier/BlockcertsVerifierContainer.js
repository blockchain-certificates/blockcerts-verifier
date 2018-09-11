import connector from '../store/connector';
import initialize from '../actions/initialize';
import { BlockcertsVerifier, SourceComponent } from './BlockcertsVerifier';
import { getErrorMessage } from '../selectors/error';
import { APIKeys } from '../models/API';

const mapDispatchToProps = {
  onLoad: initialize
};

const mapStateToProps = (state) => {
  return {
    errorMessage: getErrorMessage(state)
  };
};

const ownProps = {
  ...SourceComponent.properties,
  // make polymer detect external API value
  ...APIKeys
};

const BlockcertsVerifierContainer = connector(BlockcertsVerifier, { mapDispatchToProps, mapStateToProps, ownProps });
export { BlockcertsVerifierContainer };
