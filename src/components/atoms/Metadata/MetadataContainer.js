import connector from '../../../store/connector';
import Metadata from './Metadata';
import {
  getCertificateDefinition,
  getMetadataJson
} from '../../../selectors/certificate';

const mapStateToProps = (state) => ({
  hasCertificateDefinition: !!getCertificateDefinition(state),
  metadataList: getMetadataJson(state)
});

const MetadataContainer = connector(Metadata, { mapStateToProps });
export { MetadataContainer };
