import connector from '../store/connector';
import initialize from '../actions/initialize';
import { BlockcertsVerifier, SourceComponent } from './BlockcertsVerifier';
import { getAdditionalErrorInfo, getErrorMessage } from '../selectors/error';
import { APIKeys } from '../models/API';
import { getCertificateDefinition } from '../selectors/certificate';
import type { BlockcertsVerifierState } from '../store/getInitialState';

export const mapDispatchToProps = {
  onLoad: initialize
};

// TODO: return BlockcertsVerifierAPI when made
export const mapStateToProps = (state: BlockcertsVerifierState): any => {
  return {
    errorMessage: getErrorMessage(state),
    additionalErrorInfo: getAdditionalErrorInfo(state),
    hasCertificate: !!getCertificateDefinition(state)
  };
};

const ownProps = {
  ...SourceComponent.properties,
  // make polymer detect external API value
  ...APIKeys
};

const BlockcertsVerifierContainer = connector(BlockcertsVerifier, { mapDispatchToProps, mapStateToProps, ownProps });
export { BlockcertsVerifierContainer };
