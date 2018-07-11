import connector from '../../../store/connector';
import DownloadLink from './DownloadLink';
import { getAllowDownload } from '../../../selectors/api';

const mapStateToProps = (state) => ({
  allowDownload: getAllowDownload(state)
});

const DownloadLinkContainer = connector(DownloadLink, { mapStateToProps });
export { DownloadLinkContainer };
