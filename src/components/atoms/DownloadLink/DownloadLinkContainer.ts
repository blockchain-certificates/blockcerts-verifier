import connector from '../../../store/connector';
import DownloadLink, { DownloadLinkProps } from './DownloadLink';
import { getDownloadLink } from '../../../selectors/certificate';
import type { BlockcertsVerifierState } from '../../../store/getInitialState';

export const mapStateToProps = (state: BlockcertsVerifierState): DownloadLinkProps => ({
  downloadLink: getDownloadLink(state)
});

const ownProps = {
  display: String
};

const DownloadLinkContainer = connector(DownloadLink, { mapStateToProps, ownProps });
export default DownloadLinkContainer;
