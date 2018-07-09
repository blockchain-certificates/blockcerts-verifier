import { html } from '@polymer/lit-element';

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

  console.log(issuedOn);

  return html`<section>
    <img src='${issuerLogo}' alt='${issuerName}'/>
    <h1>${certificateTitle}</h1>
    <h2>${recipientName}</h2>
    <span>Issued on <time datetime$='${issuedOn}'>${issueDate}</time> by ${issuerName}</span>
    <a href='${recordLink}' target='_blank'>View Record ></a>
  </section>`;
}
