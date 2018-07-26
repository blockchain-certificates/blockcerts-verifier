import { html } from '@polymer/lit-element';
import CSS from './_components.certificate-details-css';

export default function CertificateDetails ({
  recipientName,
  issuedOn,
  issueDate,
  issuerName,
  transactionLink,
  transactionId
}) {
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
      value: html`<a href='${transactionLink}' target='_blank' class='buv-c-certificate-details__link'>${transactionId}</a>`
    }
  ];

  const definitionListDetails = details.map(detail => html`
    <div class='buv-c-certificate-details__group  buv-o-small-text'>
        <dt class='buv-c-certificate-details__title'>${detail.title}</dt>
        <dd class='buv-c-certificate-details__value'>${detail.value}</dd>
    </div>
  `);

  return html`
    ${CSS}
    <dl class='buv-c-certificate-details'>
        ${definitionListDetails}
    </dl>
  `;
}
