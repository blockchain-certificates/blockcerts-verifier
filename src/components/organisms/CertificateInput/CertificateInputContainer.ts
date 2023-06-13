import connector from '../../../store/connector';
import CertificateInput, { CertificateInputProps } from './CertificateInput';
import { getCertificateDefinition } from '../../../selectors/certificate';
import type { BlockcertsVerifierState } from '../../../store/getInitialState';

export const mapStateToProps = (state: BlockcertsVerifierState): CertificateInputProps => ({
  showInput: !getCertificateDefinition(state)
});

const CertificateInputContainer = connector(CertificateInput, { mapStateToProps });
export default CertificateInputContainer;
