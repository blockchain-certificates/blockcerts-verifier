import { html } from '@polymer/lit-element';
import CSS from './_components.card-css';

export default function CardCertificate ({
  hasCertificateDefinition,
  recipientName,
  certificateTitle,
  issuedOn,
  issueDate,
  issuerName,
  issuerLogo,
  recordLink
}) {
  if (!hasCertificateDefinition) {
    return null;
  }

  return html`
    ${CSS}
    <section class='buv-c-card'>
      <img src='${issuerLogo}' alt='${issuerName}' class='buv-c-card__img'/>
      <h1 class='buv-c-card__title'>${certificateTitle}</h1>
      <h2 class='buv-c-card__title  buv-c-card__recipient'>${recipientName}</h2>
      <span class='buv-c-card__issue-summary  buv-c-card__subtext'>Issued on <time datetime$='${issuedOn}'>${issueDate}</time> by ${issuerName}</span>
      <a class='buv-c-card__subtext  buv-c-card__record-link' href='${recordLink}' target='_blank'>View Record</a>
    </section>`;
}
