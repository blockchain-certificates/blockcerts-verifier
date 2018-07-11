import { html } from '@polymer/lit-element';

export default function SocialShare ({ allowSocialShare, url }) {
  if (!allowSocialShare) {
    return null;
  }

  if (!url) {
    return null;
  }

  return html`<ul>
    <li><a href='https://www.linkedin.com/shareArticle?url=${url}&mini=true' title='Share on LinkedIn'>Add to LinkedIn</a></li>
    <li><a href='https://www.facebook.com/sharer/sharer.php?u=${url}' title='Share on Facebook'>Share on Facebook</a></li>
    <li><a href='https://twitter.com/intent/tweet?url=${url}' title='Share on Twitter'>Share on Twitter</a></li>
  </ul>`;
}
