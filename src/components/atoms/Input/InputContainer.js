import updateCertificateUrl from '../../../actions/updateCertificateUrl';
import connector from '../../../store/connector';
import Input from './Input';

const mapDispatchToProps = {
  onInput: updateCertificateUrl
};

const InputContainer = connector(Input, { mapDispatchToProps });
export { InputContainer };
