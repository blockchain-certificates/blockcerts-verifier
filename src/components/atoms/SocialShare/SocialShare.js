import { html, LitElement } from '@polymer/lit-element';

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
    }
  }

  toggleOpen () {
    this.isOpen = !this.isOpen;
  }

  sharingTemplate (url) {
    return html`<div>
      <button onclick='${this.toggleOpen}'><label>Click to close</label></button>
      <ul>
        <li><a href='https://www.linkedin.com/shareArticle?url=${url}&mini=true' title='Share on LinkedIn'>Add to LinkedIn</a></li>
        <li><a href='https://www.facebook.com/sharer/sharer.php?u=${url}' title='Share on Facebook'>Share on Facebook</a></li>
        <li><a href='https://twitter.com/intent/tweet?url=${url}' title='Share on Twitter'>Share on Twitter</a></li>
      </ul>
    </div>`
  }

  sharingButton () {
    return html`<button onclick='${this.toggleOpen}'><label>Share on Social Networks</label></button>`
  }

  _render ({ allowSocialShare, url }) {
    if (!allowSocialShare) {
      return null;
    }

    if (!url) {
      return null;
    }

    return html`${ this.isOpen ? this.sharingTemplate(url) : this.sharingButton() }`;
  }
}

window.customElements.define('buv-social-share-raw', SocialShare);

// wrap SocialShare in order to plug into Container
// necessary trade-off to deal with class component in the store connector
function SocialShareWrapper (props) {
  return html`
  <buv-social-share-raw
    url='${props.url}'
  ></buv-social-share-raw>`;
}

export { SocialShareWrapper as SocialShare };
