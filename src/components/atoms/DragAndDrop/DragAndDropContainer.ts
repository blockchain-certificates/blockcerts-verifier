import connector from '../../../store/connector';
import { DragAndDrop, DragAndDropProps } from './DragAndDrop';
import uploadCertificateDefinition from '../../../actions/uploadCertificateDefinition';

const mapDispatchToProps: DragAndDropProps = {
  onDrop: uploadCertificateDefinition
};

const DragAndDropContainer = connector(DragAndDrop, { mapDispatchToProps });
export default DragAndDropContainer;
