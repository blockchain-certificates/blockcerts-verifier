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
    <li class='buv-c-full-certificate-signatures__signature'>
        <img class='buv-c-full-certificate-signatures__img' src='${signature.image}' alt='Signed by ${signature.jobTitle}'/>
        <span class='buv-o-small-text'>${signature.jobTitle}</span>
    </li>
    <li class='buv-c-full-certificate-signatures__signature'>
        <img class='buv-c-full-certificate-signatures__img' src='${signature.image}' alt='Signed by ${signature.jobTitle}'/>
        <span class='buv-o-small-text'>${signature.jobTitle}</span>
    </li>
    <li class='buv-c-full-certificate-signatures__signature'>
        <img class='buv-c-full-certificate-signatures__img' src='${signature.image}' alt='Signed by ${signature.jobTitle}'/>
        <span class='buv-o-small-text'>${signature.jobTitle}</span>
    </li>
  `);

  return html`
    ${CSS}
    <section class='buv-c-full-certificate'>
      <img class='buv-c-full-certificate-img' src='${certificateImage}'/>
      <div class='buv-c-full-certificate__titles'>
        <h1 class='buv-c-full-certificate__title  buv-c-full-certificate__title--name'>${recipientName}</h1>
        <h2 class='buv-c-full-certificate__title  buv-c-full-certificate__title--main'>${certificateTitle}</h2>
        <h3 class='buv-c-full-certificate__title  buv-c-full-certificate__title--sub'>${certificateSubtitle}</h3>
      </div>
      <p class='buv-c-full-certificate__description'>${certificateDescription}</p>
      <ul class='buv-c-full-certificate-signatures'>
        ${signatureList}
      </ul>
    <section class='seal'>
      <img src='${certificateSeal}'/>
    </section>
    </section>
    <buv-certificate-details></buv-certificate-details>
  `;
}
