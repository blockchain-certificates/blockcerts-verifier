import connector from '../../../store/connector';
import type { IMetadataProps } from './Metadata';
import { Metadata } from './Metadata';
import { getMetadata } from '../../../selectors/certificate';
import type { BlockcertsVerifierState } from '../../../store/getInitialState';

const mapStateToProps = (state: BlockcertsVerifierState): IMetadataProps => ({
  metadataList: getMetadata(state)
});

const ownProps: IMetadataProps = {
  display: String as any
};

const MetadataContainer = connector(Metadata, { mapStateToProps, ownProps });
export default MetadataContainer;
