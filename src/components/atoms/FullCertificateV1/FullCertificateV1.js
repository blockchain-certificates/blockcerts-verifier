import { html } from '@polymer/lit-element';
import CSS from './_components.full-certificate-css';

export default function FullCertificateV1 ({
  hasCertificateDefinition,
  certificateImage,
  certificateTitle,
  certificateSeal,
  certificateSignatures,
  certificateSubtitle,
  certificateDescription,
  recipientName,
  issuerName
}) {
  if (!hasCertificateDefinition) {
    return null;
  }

  const signatureList = certificateSignatures.map(signature => html`
    <li class='buv-c-full-certificate-signatures__signature'>
        <img class='buv-c-full-certificate-img--secondary' src='${signature.image}' alt='Signed by ${signature.jobTitle}'/>
        <span class='buv-o-text-12'>${signature.jobTitle}</span>
    </li>
  `);

  return html`
    ${CSS}
    <section class='buv-c-full-certificate'>
      <img class='buv-c-full-certificate-img' src='${certificateImage}' alt='${certificateTitle}'/>
      <div class='buv-c-full-certificate__titles'>
        <h1 class='buv-c-full-certificate__title  buv-c-full-certificate__title--name'>${recipientName}</h1>
        <h2 class='buv-c-full-certificate__title  buv-c-full-certificate__title--main'>${certificateTitle}</h2>
        <h3 class='buv-c-full-certificate__title  buv-c-full-certificate__title--sub'>${certificateSubtitle}</h3>
      </div>
      <p class='buv-c-full-certificate__description'>${certificateDescription}</p>
      <ul class='buv-c-full-certificate-signatures'>
        ${signatureList}
      </ul>
      <img class='buv-c-full-certificate-img--secondary' src='${certificateSeal}' alt='Certified by ${issuerName}'/>
    </section>
  `;
}
