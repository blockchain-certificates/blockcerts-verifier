import { html } from '@polymer/lit-element';

/** linkRender
 * return link for uri, email, phone number to apply in Metadata viewer
 * @param type: String. ex, string, number etc.
 * @param format: String. ex: uri, email, phoneNumber
 * @param title: String. Title of field to render.
 * @param value: String. link value
 * @param targetBlank: Bool. open uri link in a new tab. Defaults to true
 * @returns string
 */

export default function linkRender (type, format, title, value, targetBlank = true) {
  const titleHtml = html`<dt class='buv-c-metadata-list__title'>${title}</dt>`;
  let linkWrap;
  if (type === 'string') {
    switch (format) {
      case 'uri':
        let blank = targetBlank ? `target=”_blank”` : '';
        linkWrap = html`<a href="${value} ${blank}">${value}</a> `;
        break;
      case 'email':
        linkWrap = html`<a href="mailto:${value}">${value}</a> `;
        break;
      case 'phoneNumber':
        linkWrap = html`<a href="tel:${value}">${value}</a> `;
        break;
      default:
        linkWrap = value;
    }
  } else {
    linkWrap = value;
  }
  // TODO: check for types other than string

  const valueHtml = html`<dd class='buv-c-metadata-list__detail'>
            <pre class='buv-c-metadata-list__detail-text'>${linkWrap}</pre></dd>`;
  return html`${titleHtml}${valueHtml}`;
}
