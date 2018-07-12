import { html, LitElement } from '@polymer/lit-element';
import CSS from './_components.social-share-css';

class SocialShare extends LitElement {
  constructor () {
    super();
    this.isOpen = false;
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  static get properties () {
    return {
      url: String,
      allowSocialShare: Boolean,
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
            >
              Share on ${service.name}
            </a>
          </li>`
    );

    return html`<div class='buv-c-social-share-modal'>
      <button onclick='${this.toggleOpen}' class='buv-c-social-share-modal__close-button  buv-c-close  buv-c-close--hairline'>
        <label class='buv-u-visually-hidden'>Click to close</label>
      </button>
      <ul class='buv-c-social-share-modal__list'>
        ${innerHTMLList}
      </ul>
    </div>`;
  }

  sharingButton () {
    return html`<button onclick='${this.toggleOpen}' class='buv-c-social-share-link'>
      <label class='buv-u-visually-hidden'>Share on Social Networks</label>
    </button>`;
  }

  _render ({ allowSocialShare, url }) {
    if (!allowSocialShare) {
      return null;
    }

    if (!url) {
      return null;
    }

    return html`
      ${CSS}
      ${this.sharingButton()}
      ${this.isOpen ? this.sharingTemplate(url) : ''}
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
