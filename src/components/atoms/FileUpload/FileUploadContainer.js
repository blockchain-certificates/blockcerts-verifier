import connector from '../../../store/connector';
import FileUpload from './FileUpload';
import uploadCertificateDefinition from '../../../actions/uploadCertificateDefinition';

const mapDispatchToProps = {
  onChange: uploadCertificateDefinition
};

const FileUploadContainer = connector(FileUpload, { mapDispatchToProps });
export { FileUploadContainer };
