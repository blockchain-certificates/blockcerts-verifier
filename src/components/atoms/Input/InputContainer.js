import updateCertificateUrl from '../../../actions/updateCertificateUrl';
import connector from '../../../store/connector';
import Input from './Input';
import { getUrlIsValid } from '../../../selectors/input';

const mapDispatchToProps = {
  onInput: updateCertificateUrl
};

const mapStateToProps = (state) => ({
  isValid: getUrlIsValid(state)
});

const InputContainer = connector(Input, { mapDispatchToProps, mapStateToProps });
export default InputContainer;
