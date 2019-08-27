import { html } from '@polymer/lit-element';
import CSS from './_components.certificate-details-css';
import getText from '../../../i18n/getText';

const isValidLink = (link) => link.indexOf(' ') === -1;

function renderListDetail ({ title, value, isDisplayColumn, renderInline = false }) {
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

function renderTransactionId ({ title, value, transactionLink, isDisplayColumn }) {
  if (isValidLink(transactionLink)) {
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
  issuerPublicKey,
  transactionLink,
  transactionId,
  direction,
  hideRecipientName
}) {
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
      value: issuerName
    },
    {
      title: getText('text.issuerPublicKey'),
      value: issuerPublicKey
    }
  );

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
        ${renderTransactionId({ transactionLink, title: `${getText('text.transactionId')}:`, value: transactionId, isDisplayColumn })}
    </dl>
  `;
}
