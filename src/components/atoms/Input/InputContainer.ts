import updateCertificateUrl from '../../../actions/updateCertificateUrl';
import connector from '../../../store/connector';
import Input, { InputProps } from './Input';
import { getUrlIsValid } from '../../../selectors/input';
import { BlockcertsVerifierState } from '../../../store/getInitialState';

const mapDispatchToProps: InputProps = {
  onInput: updateCertificateUrl
};

const mapStateToProps = (state: BlockcertsVerifierState): InputProps => ({
  isValid: getUrlIsValid(state)
});

const InputContainer = connector(Input, { mapDispatchToProps, mapStateToProps });
export default InputContainer;
