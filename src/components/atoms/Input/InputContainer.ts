import updateCertificateUrl from '../../../actions/updateCertificateUrl';
import connector from '../../../store/connector';
import type { InputProps } from './Input';
import Input from './Input';
import { getUrlIsValid } from '../../../selectors/input';
import type { BlockcertsVerifierState } from '../../../store/getInitialState';

const mapDispatchToProps: InputProps = {
  onInput: updateCertificateUrl
};

const mapStateToProps = (state: BlockcertsVerifierState): InputProps => ({
  isValid: getUrlIsValid(state)
});

const InputContainer = connector(Input, { mapDispatchToProps, mapStateToProps });
export default InputContainer;
