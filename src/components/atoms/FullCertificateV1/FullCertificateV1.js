import { html } from '@polymer/lit-element';
import CSS from './_components.full-certificate-css';
import '../CertificateDetails';

export default function FullCertificate ({
  hasCertificateDefinition,
  certificateImage,
  certificateTitle,
  certificateSeal,
  certificateSignatures,
  certificateSubtitle,
  certificateDescription,
  recipientName
}) {
  if (!hasCertificateDefinition) {
    return null;
  }

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
    <buv-certificate-details></buv-certificate-details>
  `;
}
