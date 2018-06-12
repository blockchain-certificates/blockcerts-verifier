import updateCertificateUrl from '../../../actions/updateCertificateUrl';
import connector from '../../../connector';
import Input from './Input';

const mapDispatchToProps = {
  onInput: e => updateCertificateUrl(e.target.value)
};

const InputContainer = connector(Input, { mapDispatchToProps });
export { InputContainer };
