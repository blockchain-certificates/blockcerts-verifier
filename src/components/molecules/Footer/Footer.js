import '../../atoms/FileUpload';
import '../../atoms/VerifyOtherCertificateLink';
import { html } from '@polymer/lit-element';
import CSS from './_components.footer-css';
import BlockcertsLogo from '../../atoms/BlockcertsLogo/index';
import * as THEME from '../../../constants/theme';

const Footer = ({ forceInPlace = false, interactive = false, theme } = {}) => {
  const classes = [
    'buv-c-footer',
    forceInPlace ? 'buv-c-footer--forced' : '',
    theme === THEME.DARK ? 'buv-c-footer--dark' : ''
  ].join(' ');

  return html`
  ${CSS}
  <footer class$='${classes}'>
    ${interactive
    ? html`<section>
      <buv-file-upload></buv-file-upload>
      <buv-verify-other-certificate></buv-verify-other-certificate>
    </section>`
    : ''
}
    ${BlockcertsLogo()}
  </footer>`;
};

export default Footer;
