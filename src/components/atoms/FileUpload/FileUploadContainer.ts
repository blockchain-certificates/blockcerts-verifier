import connector from '../../../store/connector';
import FileUpload, { FileUploadProps } from './FileUpload';
import uploadCertificateDefinition from '../../../actions/uploadCertificateDefinition';
import { getCertificateDefinition } from '../../../selectors/certificate';
import { BlockcertsVerifierState } from '../../../store/getInitialState';

const mapDispatchToProps: FileUploadProps = {
  onChange: uploadCertificateDefinition
};

const mapStateToProps = (state: BlockcertsVerifierState): FileUploadProps => ({
  hideFileUpload: !!getCertificateDefinition(state)
});

const FileUploadContainer = connector(FileUpload, { mapDispatchToProps, mapStateToProps });
export default FileUploadContainer;
