import { html } from '@polymer/lit-element';
import '../../atoms/DownloadLink';
import '../../atoms/DownloadPDFLink';
import '../../molecules/Metadata';
import '../../molecules/SocialShare';
import CSS from './_components.action-menu-css';

const ActionMenu = ({ allowDownload, disableDownloadPdf, allowSocialShare, showMetadata, isVisible }) => {
  if (!allowDownload && disableDownloadPdf && !allowSocialShare && !showMetadata) {
    isVisible = false;
  }

  if (!isVisible) {
    return null;
  }

  return html`
    ${CSS}
    <menu class='buv-c-action-menu'>
      ${allowDownload ? html`
        <menuitem class='buv-c-action-menu-item'>
          <buv-download-link></buv-download-link>
        </menuitem>` : ''}
      ${showMetadata ? html`
        <menuitem class='buv-c-action-menu-item'>
          <buv-metadata></buv-metadata>
        </menuitem>` : ''}
      ${!disableDownloadPdf ? html`
        <menuitem class='buv-c-action-menu-item'>
          <buv-download-pdf-link></buv-download-pdf-link>
        </menuitem>` : ''}
      ${allowSocialShare ? html`
        <menuitem class='buv-c-action-menu-item'>
          <buv-social-share></buv-social-share>
        </menuitem>` : ''}
    </menu>
  `;
};

export default ActionMenu;
