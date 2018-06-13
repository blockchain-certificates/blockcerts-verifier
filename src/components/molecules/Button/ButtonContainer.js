import verifyCertificate from '../../../actions/verifyCertificate';
import connector from '../../../connector';
import { Button } from './Button';

const mapDispatchToProps = {
  onClick: verifyCertificate
};

const ButtonContainer = connector(Button, { mapDispatchToProps });
export { ButtonContainer };
