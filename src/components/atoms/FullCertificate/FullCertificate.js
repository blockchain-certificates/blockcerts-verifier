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
    transactionLink,
    transactionId
  }) {
  if (!hasCertificateDefinition) {
    return null;
  }

  const details = [
    {
      title: 'Recipient',
      value: recipientName
    },
    {
      title: 'Issue Date',
      value: html`<time datetime$='${issuedOn}'>${issueDate}</time>`
    },
    {
      title: 'Issuer',
      value: issuerName
    },
    {
      title: 'Transaction ID',
      value: html`<a href='${transactionLink}' target='_blank' class='buv-c-full-certificate-details__link'>${transactionId}</a>`
    }
  ];

  const definitionListDetails = details.map(detail => html`
    <div class='buv-c-full-certificate-details__group'>
        <dt class='buv-c-full-certificate-details__title'>${detail.title}</dt>
        <dd class='buv-c-full-certificate-details__value'>${detail.value}</dd>
    </div>
  `);

  return html`
    ${CSS}
    <div class='buv-c-full-certificate'>${unsafeHTML(displayHTML)}</div>
    <dl class='buv-c-full-certificate-details'>
        ${definitionListDetails}
    </dl>
  `;
}
