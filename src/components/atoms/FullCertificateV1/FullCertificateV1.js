import { html } from '@polymer/lit-element';
import CSS from './_components.full-certificate-css';

export default function FullCertificate ({
  hasCertificateDefinition,
  certificateImage,
  certificateTitle,
  certificateSeal,
  certificateSignatures,
  certificateSubtitle,
  certificateDescription,
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
    <div class='buv-c-full-certificate-details__group  buv-o-small-text'>
        <dt class='buv-c-full-certificate-details__title'>${detail.title}</dt>
        <dd class='buv-c-full-certificate-details__value'>${detail.value}</dd>
    </div>
  `);

  const signatureList = certificateSignatures.map(signature => html`
    <li>
        <img src='${signature.image}' alt='Signed by ${signature.jobTitle}'/>
        <span>${signature.jobTitle}</span>
    </li>
  `);

  return html`
    ${CSS}
    <section class='buv-c-full-certificate'>
      <section class='certificate-image'>
        <img src='${certificateImage}'/>
      </section>
      <section class='headers'>
        <h1 class='recipient'>${recipientName}</h1>
        <h2 class='title'>${certificateTitle}</h2>
        <h3 class='subtitle'>${certificateSubtitle}</h3>
      </section>
      <section class='description'>
        <p>${certificateDescription}</p>
      </section>
      <ul class='signatures'>
        ${signatureList}
      </ul>
    <section class='seal'>
      <img src='${certificateSeal}'/>
    </section>
    </section>
    <dl class='buv-c-full-certificate-details'>
        ${definitionListDetails}
    </dl>
  `;
}
