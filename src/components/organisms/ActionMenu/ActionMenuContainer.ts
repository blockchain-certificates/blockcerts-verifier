import connector from '../../../store/connector';
import type { ActionMenuProps } from './ActionMenu';
import ActionMenu from './ActionMenu';
import {
  getAllowDownload,
  getDisableDownloadPdf,
  getAllowSocialShare,
  getDisplayMode,
  getShowMetadata
} from '../../../selectors/api';
import * as DISPLAY_MODE from '../../../constants/displayMode';
import { getCertificateDefinition } from '../../../selectors/certificate';
import type { BlockcertsVerifierState } from '../../../store/getInitialState';

export const mapStateToProps = (state: BlockcertsVerifierState): ActionMenuProps => ({
  allowDownload: getAllowDownload(state),
  disableDownloadPdf: getDisableDownloadPdf(state),
  allowSocialShare: getAllowSocialShare(state),
  showMetadata: getShowMetadata(state),
  isVisible: getDisplayMode(state) === DISPLAY_MODE.FULL && !!getCertificateDefinition(state)
});

const ActionMenuContainer = connector(ActionMenu, { mapStateToProps });
export default ActionMenuContainer;
