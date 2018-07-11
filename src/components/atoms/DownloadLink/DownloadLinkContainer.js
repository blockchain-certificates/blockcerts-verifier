import connector from '../../../store/connector';
import DownloadLink from './DownloadLink';
import { getAllowDownload } from '../../../selectors/api';
import { getDownloadLink } from '../../../selectors/certificate';

export const mapStateToProps = (state) => ({
  allowDownload: getAllowDownload(state),
  downloadLink: getDownloadLink(state)
});

const DownloadLinkContainer = connector(DownloadLink, { mapStateToProps });
export { DownloadLinkContainer };
