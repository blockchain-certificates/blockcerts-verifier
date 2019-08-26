import { html } from '@polymer/lit-element';
import CSS from './_components.certificate-details-css';

const isValidLink = (link) => link.indexOf(' ') === -1;

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
      title: 'Bénéficiaire',
      value: recipientName
    },
    {
      title: "Date d'émission",
      value: html`<time datetime$='${issuedOn}'>${issueDate}</time>`
    },
    {
      title: 'Emetteur',
      value: issuerName
    }
  ];

  const definitionListDetails = details.map(detail => html`
    <div class='buv-c-certificate-details__group'>
        <dt class='buv-c-certificate-details__title  buv-o-text-11'>${detail.title}</dt>
        <dd class='buv-c-certificate-details__value'>${detail.value}</dd>
    </div>
  `);

  return html`
    ${CSS}
    <dl class='buv-c-certificate-details  buv-o-text-12'>
        ${definitionListDetails}
        <div class='buv-c-certificate-details__standalone  buv-o-text-11'>
          ${
  isValidLink(transactionLink)
    ? html`<dt class='buv-c-certificate-details--inline'>identifiant de transaction:</dt>
                  <dd class='buv-c-certificate-details--inline'>${transactionId}</dd>`
    : html`<span>Aucun identifiant de transaction</span>`
}
        </div>
    </dl>
  `;
}
