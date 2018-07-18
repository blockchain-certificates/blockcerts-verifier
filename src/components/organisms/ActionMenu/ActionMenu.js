import { html } from '@polymer/lit-element';
import '../../atoms/DownloadLink';
import '../../molecules/Metadata';
import '../../molecules/SocialShare';
import CSS from './_components.action-menu-css';

const ActionMenu = html`
  ${CSS}
  <menu class='buv-c-action-menu'>
    <menuitem><buv-metadata></buv-metadata></menuitem>
    <menuitem><buv-download-link></buv-download-link></menuitem>
    <menuitem><buv-social-share></buv-social-share></menuitem>
  </menu>
`;

export default ActionMenu;
