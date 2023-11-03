import connector from '../../../store/connector';
import type { SocialShareProps } from './SocialShare';
import { SocialShare } from './SocialShare';
import { getRecordLink } from '../../../selectors/certificate';
import shareSocialNetwork from '../../../actions/shareSocialNetwork';
import type { BlockcertsVerifierState } from '../../../store/getInitialState';

const mapDispatchToProps: SocialShareProps = {
  onShare: shareSocialNetwork
};

export const mapStateToProps = (state: BlockcertsVerifierState): SocialShareProps => ({
  url: getRecordLink(state)
});

const ownProps: SocialShareProps = {
  display: String as any
};

const SocialShareContainer = connector(SocialShare, { mapDispatchToProps, mapStateToProps, ownProps });
export default SocialShareContainer;
