import { html, LitElement } from '@polymer/lit-element';
import CSS from './_components.social-share-css';
import CloseButton from '../../atoms/CloseButton';
import getText from '../../../i18n/getText';
import { TemplateResult } from 'lit-html';

export interface SocialShareProps {
  isOpen?: boolean;
  url?: string;
  onShare?: (name: string) => any;
  display?: string;
}

interface SocialMediaObject {
  name: string;
  shareUrl: string;
}

class SocialShare extends LitElement {
  private isOpen: boolean;

  constructor () {
    super();
    this.isOpen = false;
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  static get properties (): SocialShareProps {
    return {
      url: String as any,
      isOpen: Boolean as any,
      onShare: Function as any,
      display: String as any
    };
  }

  toggleOpen (): void {
    this.isOpen = !this.isOpen;
  }

  sharingTemplate ({ url, onShare, display }: SocialShareProps): TemplateResult {
    if (!this.isOpen) {
      return;
    }

    if (!url) {
      return;
    }
    const isPlainText = display === 'plaintext';
    const socialServices: SocialMediaObject[] = [
      {
        name: 'LinkedIn',
        shareUrl: `https://www.linkedin.com/shareArticle?url=${url}&mini=true`
      },
      {
        name: 'Facebook',
        shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${url}`
      },
      {
        name: 'Twitter',
        shareUrl: `https://twitter.com/intent/tweet?url=${url}`
      }
    ];

    const innerHTMLList = socialServices.map(service =>
      html`<li class$='buv-c-social-share-modal__list-item  ${isPlainText ? 'buv-c-social-share-modal__list-item--plaintext' : ''}'>
            <a
              href='${service.shareUrl}'
              title='Share on ${service.name}'
              class='buv-o-link  buv-c-social-share-modal__link'
              target='_blank'
              onclick='${() => { onShare(service.name); }}'
            >
              <span>${getText('text.share')} ${service.name}</span>
            </a>
          </li>`
    );

    const list = html`<ul class='buv-c-social-share-modal__list'>
        ${innerHTMLList}
      </ul>`;

    if (isPlainText) {
      return list;
    }

    return html`<div class='buv-c-social-share-modal  buv-o-text-12  buv-o-overlay'>
      ${CloseButton({
    onClick: this.toggleOpen,
    className: 'buv-c-social-share-modal__close-button'
  })}
      ${list}
    </div>`;
  }

  sharingButton ({ url, display }: SocialShareProps): TemplateResult {
    const isPlainText = display === 'plaintext';
    if (isPlainText) {
      this.isOpen = true;
      return;
    }

    const hasUrl = !!url;
    const info = hasUrl ? getText('text.shareButton') : getText('text.noShareUrl');
    return html`<button 
        onclick='${this.toggleOpen}'
        class='buv-c-social-share-link  buv-o-button-link'
        disabled?='${!hasUrl}'
        aria-disabled?='${!hasUrl}'
        title$='${info}'
      >
      <label class='buv-u-visually-hidden'>${info}</label>
    </button>`;
  }

  _render (props: SocialShareProps): TemplateResult {
    return html`
      ${CSS}
      ${this.sharingButton(props)}
      ${this.sharingTemplate(props)}
    `;
  }
}

window.customElements.define('buv-social-share-raw', SocialShare);

// wrap SocialShare in order to plug into Container
// necessary trade-off to deal with class component in the store connector
function SocialShareWrapper (props: SocialShareProps): TemplateResult {
  return html`
  <buv-social-share-raw
    url='${props.url}'
    onShare='${props.onShare}'
    display='${props.display}'
  ></buv-social-share-raw>`;
}

export default SocialShare; // component export for testing
export { SocialShareWrapper as SocialShare };
