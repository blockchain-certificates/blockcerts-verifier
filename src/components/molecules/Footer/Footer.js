import '../../atoms/FileUpload';
import '../../atoms/VerifyOtherCertificateLink';
import { html } from '@polymer/lit-element';
import CSS from './_components.footer-css';
import BlockcertsLogo from '../../atoms/BlockcertsLogo/BlockcertsLogo';

const Footer = ({forceInPlace = false, interactive = true} = {}) => {
  const classes = [
    'buv-c-footer',
    forceInPlace ? 'buv-c-footer--forced' : ''
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
