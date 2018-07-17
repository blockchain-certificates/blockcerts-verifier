import connector from '../../../store/connector';
import { Metadata } from './Metadata';
import { getMetadataJson } from '../../../selectors/certificate';
import { getShowMetadata } from '../../../selectors/api';

const mapStateToProps = (state) => ({
  metadataList: getMetadataJson(state),
  showMetadata: getShowMetadata(state)
});

const MetadataContainer = connector(Metadata, { mapStateToProps });
export { MetadataContainer };
