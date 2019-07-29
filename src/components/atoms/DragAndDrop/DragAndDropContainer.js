import connector from '../../../store/connector';
import { DragAndDrop } from './DragAndDrop';
import uploadCertificateDefinition from '../../../actions/uploadCertificateDefinition';

const mapDispatchToProps = {
  onDrop: uploadCertificateDefinition
};

const DragAndDropContainer = connector(DragAndDrop, { mapDispatchToProps });
export default DragAndDropContainer;
