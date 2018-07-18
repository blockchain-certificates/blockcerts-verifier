import connector from '../../../store/connector';
import ActionMenu from './ActionMenu';
import { getAllowDownload, getAllowSocialShare, getShowMetadata } from '../../../selectors/api';

export const mapStateToProps = (state) => ({
  allowDownload: getAllowDownload(state),
  allowSocialShare: getAllowSocialShare(state),
  showMetadata: getShowMetadata(state)
});

const ActionMenuContainer = connector(ActionMenu, { mapStateToProps });
export { ActionMenuContainer };
