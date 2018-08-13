import connector from '../../../store/connector';
import { SocialShare } from './SocialShare';
import { getRecordLink } from '../../../selectors/certificate';
import shareSocialNetwork from '../../../actions/shareSocialNetwork';

const mapDispatchToProps = {
  onShare: shareSocialNetwork
};

export const mapStateToProps = (state) => ({
  url: getRecordLink(state)
});

const SocialShareContainer = connector(SocialShare, { mapDispatchToProps, mapStateToProps });
export { SocialShareContainer };
