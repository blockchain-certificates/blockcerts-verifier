import { html, LitElement } from '@polymer/lit-element';

class SocialShare extends LitElement {
  constructor () {
    super();
    this.isOpen = false;
    this.handleClick = this.handleClick.bind(this);
  }

  static get properties () {
    return {
      url: String,
      allowSocialShare: Boolean,
      isOpen: String
    }
  }

  handleClick () {
    this.isOpen = true;
  }

  sharingTemplate (url) {
    return html`<ul>
      <li><a href='https://www.linkedin.com/shareArticle?url=${url}&mini=true' title='Share on LinkedIn'>Add to LinkedIn</a></li>
      <li><a href='https://www.facebook.com/sharer/sharer.php?u=${url}' title='Share on Facebook'>Share on Facebook</a></li>
      <li><a href='https://twitter.com/intent/tweet?url=${url}' title='Share on Twitter'>Share on Twitter</a></li>
    </ul>`
  }

  sharingButton () {
    return html`<button onclick='${this.handleClick}'><label>Share on Social Networks</label></button>`
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

export default SocialShare;
