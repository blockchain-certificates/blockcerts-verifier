import connector from '../../../store/connector';
import DownloadLink from './DownloadLink';
import { getDownloadLink } from '../../../selectors/certificate';

export const mapStateToProps = (state) => ({
  downloadLink: getDownloadLink(state)
});

const ownProps = {
  display: String
};

const DownloadLinkContainer = connector(DownloadLink, { mapStateToProps, ownProps });
export default DownloadLinkContainer;
