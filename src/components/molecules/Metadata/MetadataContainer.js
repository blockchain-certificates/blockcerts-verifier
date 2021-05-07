import connector from '../../../store/connector';
import { Metadata } from './Metadata';
import { getMetadata } from '../../../selectors/certificate';

const mapStateToProps = (state) => ({
  metadataList: getMetadata(state)
});

const ownProps = {
  display: String
};

const MetadataContainer = connector(Metadata, { mapStateToProps, ownProps });
export default MetadataContainer;
