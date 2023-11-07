import connector from '../../../store/connector';
import type { FileUploadProps } from './FileUpload';
import FileUpload from './FileUpload';
import uploadCertificateDefinition from '../../../actions/uploadCertificateDefinition';
import { getCertificateDefinition } from '../../../selectors/certificate';
import type { BlockcertsVerifierState } from '../../../store/getInitialState';

const mapDispatchToProps: FileUploadProps = {
  onChange: uploadCertificateDefinition
};

const mapStateToProps = (state: BlockcertsVerifierState): FileUploadProps => ({
  hideFileUpload: !!getCertificateDefinition(state)
});

const FileUploadContainer = connector(FileUpload, { mapDispatchToProps, mapStateToProps });
export default FileUploadContainer;
