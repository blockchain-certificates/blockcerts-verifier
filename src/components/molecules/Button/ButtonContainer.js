import verifyCertificate from '../../../actions/verifyCertificate';
import connector from '../../../store/connector';
import { Button } from './Button';
import { getUrlIsValid } from '../../../selectors/input';
import { getCertificateDefinition } from '../../../selectors/certificate';

const mapDispatchToProps = {
  onClick: verifyCertificate
};

export const mapStateToProps = (state) => ({
  cancelSpinner: typeof getUrlIsValid(state) === 'undefined' ? false : !getUrlIsValid(state),
  isDisabled: !getCertificateDefinition(state)
});

const ButtonContainer = connector(Button, { mapDispatchToProps, mapStateToProps });
export default ButtonContainer;
