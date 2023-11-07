import connector from '../../../store/connector';
import type { FooterProps } from './Footer';
import Footer from './Footer';
import { getTheme } from '../../../selectors/api';
import type { BlockcertsVerifierState } from '../../../store/getInitialState';

const mapStateToProps = (state: BlockcertsVerifierState): FooterProps => ({
  theme: getTheme(state)
});

const ownProps: FooterProps = {
  forceInPlace: Boolean as any,
  interactive: Boolean as any
};

const FooterContainer = connector(Footer, { mapStateToProps, ownProps });
export default FooterContainer;
