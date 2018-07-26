import { html } from '@polymer/lit-element';
import CSS from './_components.full-certificate-css';

export default function FullCertificate ({
   hasCertificateDefinition,
   certificateImage,
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

  return html`
    ${CSS}
    <section class='buv-c-full-certificate'>
      <section class='certificate-image'>
        <img src='${certificateImage}'/>
      </section>
      <section class='headers'>
        <h1 class='recipient'>{{_recipient}}</h1>
        <h2 class='title'>{{_title}}</h2>
        <h3 class='subtitle'>{{_subtitle}}</h3>
      </section>
      <section class='description'>
        <p>{{_description}}</p>
      </section>
      <section class='signatures'>
        <template is='dom-repeat'
                  as='signature'
                  items=''{{_signatures}}'>
          <section class='signature'>
            <img src={{signature.image}}/>
            <span>{{signature.jobTitle}}</span>
          </section>
        </template>
      </section>
    <section class='seal'>
      <img src={{_sealImage}}/>
    </section>
    </section>
    <dl class='buv-c-full-certificate-details'>
        ${definitionListDetails}
    </dl>
  `;
}
