import connector from '../../../store/connector';
import type { DragAndDropProps } from './DragAndDrop';
import { DragAndDrop } from './DragAndDrop';
import uploadCertificateDefinition from '../../../actions/uploadCertificateDefinition';

const mapDispatchToProps: DragAndDropProps = {
  onDrop: uploadCertificateDefinition
};

const DragAndDropContainer = connector(DragAndDrop, { mapDispatchToProps });
export default DragAndDropContainer;
