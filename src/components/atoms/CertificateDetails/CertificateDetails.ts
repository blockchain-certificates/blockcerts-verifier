import { html } from '@polymer/lit-element';
import CSS from './_components.certificate-details-css';
import getText from '../../../i18n/getText';
import { TemplateResult } from 'lit-html';
import getOrdinalNumber from '../../../i18n/getOrdinalNumber';
import '../SuiteVerificationStatus';

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
  signatureSuiteType?: string[];
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

export default function CertificateDetails ({
  recipientName,
  issuedOn,
  issueDate,
  issuerName,
  issuerProfileDomain = [],
  issuerProfileUrl = [],
  issuerPublicKey = [],
  transactionId = [],
  direction,
  hideRecipientName,
  signatureSuiteType = []
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
    let prefix = '';
    if (issuerPublicKey.length > 1) {
      prefix = `${getOrdinalNumber(i + 1)} `;
    }

    if (signatureSuiteType[i]) {
      details.push({
        title: `${prefix}${getText('text.signatureSuiteType')}`,
        value: html`<buv-suite-verification-status suiteType$='${signatureSuiteType[i]}' index$='${i}'>
            ${signatureSuiteType[i]}
        </buv-suite-verification-status>`
      });
    }

    if (issuerProfileDomain[i]) {
      details.push({
        title: `${prefix}${getText('text.issuerProfileDomain')}`,
        value: html`<a href$='${issuerProfileUrl[i]}' target="_blank">${issuerProfileDomain[i]}</a>`
      });
    }

    if (issuerPublicKey[i]) {
      details.push({
        title: `${prefix}${getText('text.issuerPublicKey')}`,
        value: issuerPublicKey[i]
      });
    }

    if (transactionId[i]) {
      details.push(
        {
          title: `${prefix}${getText('text.transactionId')}`,
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
