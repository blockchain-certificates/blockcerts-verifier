import { html } from '@polymer/lit-element';

export default function CardCertificate ({ certificateDefinition }) {
  if (!certificateDefinition) {
    return null;
  }
  // TODO: move that away from component, to selector
  const recipientName = certificateDefinition.recipientProfile.name;
  const certificateTitle = certificateDefinition.badge.name;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const objDate = new Date(certificateDefinition.issuedOn);
  const issueDate = months[objDate.getMonth()] + ' ' + objDate.getDate() + ', ' + objDate.getFullYear();
  const issuerName = certificateDefinition.badge.issuer.name;
  const issuerLogo = certificateDefinition.badge.issuer.image;
  const recordLink = certificateDefinition.id;

  return html`<section>
    <img src='${issuerLogo}' alt='${issuerName}'/>
    <h1>${certificateTitle}</h1>
    <h2>${recipientName}</h2>
    <span>Issued on ${issueDate} by ${issuerName}</span>
    <a href='${recordLink}' target='_blank'>View Record ></a>
  </section>`;
}
