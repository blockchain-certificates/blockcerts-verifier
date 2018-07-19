import connector from '../../../store/connector';
import CertificateInput from './CertificateInput';
import { getCertificateDefinition } from '../../../selectors/certificate';

export const mapStateToProps = (state) => ({
  showInput: !getCertificateDefinition(state)
});

const CertificateInputContainer = connector(CertificateInput, { mapStateToProps });
export default CertificateInputContainer;
