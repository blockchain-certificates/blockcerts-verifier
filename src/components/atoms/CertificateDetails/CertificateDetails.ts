import { html } from '@polymer/lit-element';
import CSS from './_components.certificate-details-css';
import getText from '../../../i18n/getText';
import { TemplateResult } from 'lit-html';

const isValidLink = (link: string): boolean => !link?.includes(' ');

interface IRenderInterface {
  title?: string;
  value?: string;
  isDisplayColumn?: boolean;
  renderInline?: boolean;
  transactionLink?: string[];
}

export interface ICertificateDetailsApi {
  recipientName?: string;
  issuedOn?: string;
  issueDate?: string;
  issuerName?: string;
  issuerPublicKey?: string[];
  transactionId?: string[];
  issuerProfileUrl?: string[];
  issuerProfileDomain?: string[];
  direction?: any; // enum
  hideRecipientName?: boolean;
}

function renderListDetail ({ title, value, isDisplayColumn, renderInline = false }: IRenderInterface): TemplateResult {
  const classes = [
    'buv-c-certificate-details__group',
    isDisplayColumn ? '' : 'buv-c-certificate-details__group--row'
  ].join(' ');

  const titleClasses = [
    'buv-c-certificate-details__title',
    isDisplayColumn ? '' : 'buv-o-text-11'
  ].join(' ');

  const ddClasses = [
    'buv-c-certificate-details__value',
    renderInline ? 'buv-c-certificate-details--inline' : ''
  ].join(' ');

  return html`<div class$='${classes}'>
    <dt class$='${titleClasses}'>${title}</dt>
    <dd class$='${ddClasses}'>${value}</dd>
  </div>`;
}

function renderTransactionId ({ title, value, transactionLink, isDisplayColumn }: IRenderInterface): TemplateResult {
  if (isValidLink(transactionLink[0])) {
    if (isDisplayColumn) {
      return renderListDetail({ title, value, isDisplayColumn, renderInline: true });
    }

    return html`
      <div class='buv-c-certificate-details__standalone  buv-o-text-11'>
        <dt class='buv-c-certificate-details__title  buv-c-certificate-details--inline'>${title}</dt>
        <dd class='buv-c-certificate-details--inline'>${value}</dd>
      </div>`;
  } else {
    return html`<span>${getText('errors.noTransactionId')}</span>`;
  }
}

export default function CertificateDetails ({
  recipientName,
  issuedOn,
  issueDate,
  issuerName,
  issuerProfileDomain,
  issuerProfileUrl,
  issuerPublicKey,
  transactionId,
  direction,
  hideRecipientName
}: ICertificateDetailsApi): TemplateResult {
  const details = [];
  if (!hideRecipientName) {
    details.push({
      title: getText('text.recipient'),
      value: recipientName
    });
  }

  details.push(
    {
      title: getText('text.issueDate'),
      value: html`<time datetime$='${issuedOn}'>${issueDate}</time>`
    },
    {
      title: getText('text.issuerName'),
      value: issuerName || getText('errors.noIssuerName')
    }
  );

  for (let i = 0; i < issuerPublicKey.length; i++) {
    if (issuerProfileDomain[i]) {
      details.push({
        title: getText('text.issuerProfileDomain'),
        value: html`<a href$='${issuerProfileUrl[i]}' target="_blank">${issuerProfileDomain[i]}</a>`
      });
    }

    if (issuerPublicKey[i]) {
      details.push({
        title: getText('text.issuerPublicKey'),
        value: issuerPublicKey[i]
      });
    }

    if (transactionId[i]) {
      details.push(
        {
          title: getText('text.transactionId'),
          value: transactionId[i]
        }
      );
    }
  }

  const isDisplayColumn = direction === 'column';
  const definitionListDetails = details.map(detail => renderListDetail({ ...detail, isDisplayColumn }));

  const classes = [
    'buv-c-certificate-details',
    'buv-o-text-13',
    isDisplayColumn ? 'buv-c-certificate-details--column' : ''
  ].join(' ');

  return html`
    ${CSS}
    <dl class$='${classes}'>
        ${definitionListDetails}
    </dl>
  `;
}
