import connector from '../../../connector';
import { Button } from './Button';

const mapDispatchToProps = {
  onClick: () => { console.log('button click'); }
};

const ButtonContainer = connector(Button, { mapDispatchToProps });
export { ButtonContainer };
