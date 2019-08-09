import connector from '../../../store/connector';
import { Metadata } from './Metadata';
import { getMetadataJson } from '../../../selectors/certificate';

const mapStateToProps = (state) => ({
  metadataList: getMetadataJson(state)
});

const ownProps = {
  display: String
};

const MetadataContainer = connector(Metadata, { mapStateToProps, ownProps });
export default MetadataContainer;
