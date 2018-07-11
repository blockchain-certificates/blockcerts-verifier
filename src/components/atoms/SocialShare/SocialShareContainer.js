import connector from '../../../store/connector';
import { SocialShare } from './SocialShare';
import { getRecordLink } from '../../../selectors/certificate';
import { getAllowSocialShare } from '../../../selectors/api';

const mapStateToProps = (state) => ({
  url: getRecordLink(state),
  allowSocialShare: getAllowSocialShare(state)
});

const SocialShareContainer = connector(SocialShare, { mapStateToProps });
export { SocialShareContainer };
