import { html, LitElement } from '@polymer/lit-element';
import CSS from './_components.social-share-css';
import CloseButton from '../../atoms/CloseButton';

class SocialShare extends LitElement {
  constructor () {
    super();
    this.isOpen = false;
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  static get properties () {
    return {
      url: String,
      isOpen: String
    };
  }

  toggleOpen () {
    this.isOpen = !this.isOpen;
  }

  sharingTemplate (url) {
    const socialServices = [
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
      html`<li class='buv-c-social-share-modal__list-item'>
            <a
              href='${service.shareUrl}'
              title='Share on ${service.name}'
              class='buv-o-link  buv-c-social-share-modal__link'
              target='_blank'
            >
              Share on ${service.name}
            </a>
          </li>`
    );

    return html`<div class='buv-c-social-share-modal  buv-o-small-text  buv-o-overlay'>
      ${CloseButton({
    onClick: this.toggleOpen,
    className: 'buv-c-social-share-modal__close-button'
  })}
      <ul class='buv-c-social-share-modal__list'>
        ${innerHTMLList}
      </ul>
    </div>`;
  }

  sharingButton (hasUrl) {
    const info = hasUrl ? 'Share on Social Networks' : 'No URL to share!';
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

  _render ({ url }) {
    return html`
      ${CSS}
      ${this.sharingButton(!!url)}
      ${this.isOpen && url ? this.sharingTemplate(url) : ''}
    `;
  }
}

window.customElements.define('buv-social-share-raw', SocialShare);

// wrap SocialShare in order to plug into Container
// necessary trade-off to deal with class component in the store connector
function SocialShareWrapper (props) {
  return html`
  <buv-social-share-raw
    url='${props.url}'
    allowSocialShare='${props.allowSocialShare}'
  ></buv-social-share-raw>`;
}

export { SocialShareWrapper as SocialShare };
