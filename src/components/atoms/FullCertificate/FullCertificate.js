import { html } from '@polymer/lit-element';
import { unsafeHTML } from 'lit-html/lib/unsafe-html.js';
import CSS from './_components.full-certificate-css';

export default function CardCertificate ({
    hasCertificateDefinition,
    displayHTML,
    recipientName,
    issuedOn,
    issueDate,
    issuerName,
    transactionLink
  }) {
  if (!hasCertificateDefinition) {
    return null;
  }

  return html`
    ${CSS}
    <div class='buv-c-full-certificate'>${unsafeHTML(displayHTML)}</div>
    <dl class='buv-c-full-certificate-details'>
        <dt>Recipient</dt>
        <dd>${recipientName}</dd>
        <dt>Issue Date</dt>
        <dd><time datetime$='${issuedOn}'>${issueDate}</time></dd>
        <dt>Issuer</dt>
        <dd>${issuerName}</dd>
        <dt>Transaction Id</dt>
        <dd>${transactionLink}</dd>
    </dl>
  `;
}
