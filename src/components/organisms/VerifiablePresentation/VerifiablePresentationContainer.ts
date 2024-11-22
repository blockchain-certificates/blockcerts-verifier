import type { BlockcertsVerifierState } from '../../../store/getInitialState';
import type { IVerifiablePresentationApi } from './VerifiablePresentation';
import connector from '../../../store/connector';
import { getVerifiableCredentials } from '../../../selectors/certificate';
import { VerifiablePresentation } from './VerifiablePresentation';

export const mapStateToProps = (state: BlockcertsVerifierState): Partial<IVerifiablePresentationApi> => ({
  verifiableCredentials: getVerifiableCredentials(state)
});

const VerifiablePresentationContainer = connector(VerifiablePresentation, { mapStateToProps });
export { VerifiablePresentationContainer };
