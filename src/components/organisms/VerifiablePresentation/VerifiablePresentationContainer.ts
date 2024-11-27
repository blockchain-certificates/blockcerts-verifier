import type { BlockcertsVerifierState } from '../../../store/getInitialState';
import type { IVerifiablePresentationApi } from './VerifiablePresentation';
import connector from '../../../store/connector';
import { getVerifiableCredentials } from '../../../selectors/certificate';
import { VerifiablePresentation } from './VerifiablePresentation';

export const mapStateToProps = (state: BlockcertsVerifierState): Partial<IVerifiablePresentationApi> => ({
  // this is a hack to force rerenders as the verification of individual credentials occurs
  verifiableCredentials: JSON.stringify(getVerifiableCredentials(state))
});

const VerifiablePresentationContainer = connector(VerifiablePresentation, { mapStateToProps });
export { VerifiablePresentationContainer };
