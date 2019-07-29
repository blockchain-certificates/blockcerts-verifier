import connector from '../../../store/connector';
import FileUpload from './FileUpload';
import uploadCertificateDefinition from '../../../actions/uploadCertificateDefinition';
import { getCertificateDefinition } from '../../../selectors/certificate';

const mapDispatchToProps = {
  onChange: uploadCertificateDefinition
};

const mapStateToProps = state => ({
  hideFileUpload: getCertificateDefinition(state)
});

const FileUploadContainer = connector(FileUpload, { mapDispatchToProps, mapStateToProps });
export default FileUploadContainer;
