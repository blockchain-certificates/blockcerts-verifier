import { html } from '@polymer/lit-element';
import '../../atoms/DownloadLink';
import '../../molecules/Metadata';
import '../../molecules/SocialShare';
import CSS from './_components.action-menu-css';

const ActionMenu = ({ allowDownload, allowSocialShare, showMetadata }) => {
  return html`
    ${CSS}
    <menu class='buv-c-action-menu'>
      ${ showMetadata ? html`<menuitem><buv-metadata></buv-metadata></menuitem>` : ''}
      ${ allowDownload ? html`<menuitem><buv-download-link></buv-download-link></menuitem>` : ''}
      ${ allowSocialShare ? html`<menuitem><buv-social-share></buv-social-share></menuitem>` : ''}
    </menu>
  `;
};

export default ActionMenu;
