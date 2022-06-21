import { logoWithBranding } from '../components/atoms/BlockcertsLogo/BlockcertsLogo';
import getOrdinalNumber from '../i18n/getOrdinalNumber';

export const PDF_COVER_PAGE_WIDTH = 595;
export const PDF_COVER_PAGE_HEIGHT = 842;

type TCredentialProperty = {
  title: string;
  value: string;
};

type TIssuerInfo = {
  publicKey: string;
  url: string;
  domain: string;
};

function buildIssuerInfo (issuerInfo: TIssuerInfo[]): string {
  const showOrdinalNumber: boolean = issuerInfo.length > 1;
  const html: string[] = ['<div style="margin:15px 0">'];

  html.push('<dt style="margin-bottom:5px;text-transform:uppercase;font-weight:600;font-size:12px">Issuer Information</dt>');
  html.push('<dd style="margin:0;font-size:13px">');
  html.push('<div style="display:flex;flex-direction:column;align-content:center;row-gap:4px;padding:0 20px;font-size:12px">');

  html.push(...issuerInfo.map((info: TIssuerInfo, index: number): string => {
    const issuerBlockInfo: string[] = [
      '<div style="display:flex;flex-direction:column;row-gap:3px;justify-content:center;padding:5px 10px">'
    ];

    issuerBlockInfo.push('<div>');
    if (showOrdinalNumber) {
      issuerBlockInfo.push(`<span style="font-weight:500;margin-right:10px">${getOrdinalNumber(index + 1)}</span>`);
    }
    issuerBlockInfo.push(`<span>Public Key: ${info.publicKey}</span>`);
    issuerBlockInfo.push('</div>');

    if (info.url && info.domain) {
      issuerBlockInfo.push(`<span><a href="${info.url}">${info.domain}</a></span>`);
    }

    issuerBlockInfo.push('</div>');

    return issuerBlockInfo.join('');
  }));

  html.push('<div/>');
  html.push('<dd/>');
  html.push('<div/>');

  return html.join('');
}

const getPDFCoverPage = ({
  certificateTitle = '',
  issueDate = '',
  issuerName = '',
  recipientName = '',
  issuerPublicKey = [],
  issuerPublicDomain = [],
  issuerPublicUrl = [],
  issuerLogo = '',
  qrCodeImage = ''
}: {
  certificateTitle?: string;
  issueDate: string;
  recipientName: string;
  issuerName: string;
  issuerPublicKey: string[];
  issuerPublicDomain: string[];
  issuerPublicUrl: string[];
  issuerLogo?: string;
  qrCodeImage?: string;
}): HTMLElement => {
  const html: string[] = [];
  const textColor = 'color:rgb(0,0,0);';

  if (certificateTitle || issuerLogo) {
    html.push('<section>');

    if (issuerLogo) {
      html.push(`<div style="margin:0 auto;width:140px;height:140px;background-repeat:no-repeat;background-position:center;background-size:contain;background-image:url('${issuerLogo}');"></div>`);
    }

    if (certificateTitle) {
      html.push(`<h2 style="margin:20px 0;font-size:18px;text-align:center">${certificateTitle}</h2>`);
    }

    html.push('</section>');
  }

  html.push('<section style="text-align:center">');

  const credentialProperties: TCredentialProperty[] = [
    { title: 'Issue Date', value: issueDate },
    { title: 'Recipient', value: recipientName },
    { title: 'Issuer', value: issuerName }
  ];

  html.push(...credentialProperties.map((credentialProperty: TCredentialProperty): string => {
    return `<div style="margin:15px 0"><dt style="margin-bottom:5px;text-transform:uppercase;font-weight:600;font-size:12px">${credentialProperty.title}</dt><dd style="margin:0;font-size:13px">${credentialProperty.value}</dd></div>`;
  }));

  const issuerInfo: TIssuerInfo[] = issuerPublicKey.map((publicKey: string, index: number) => {
    return {
      publicKey,
      url: issuerPublicUrl[index],
      domain: issuerPublicDomain[index]
    };
  });
  html.push(buildIssuerInfo(issuerInfo));

  html.push('</section>');

  if (qrCodeImage) {
    html.push('<section>');
    html.push('<span style="margin-bottom:15px;font-size:10px">Scan the QR code to verify the document.</span>');
    html.push(`<div style="margin:0 auto;width:110px;height:110px;background-repeat:no-repeat;background-position:center;background-size:contain;background-image:url('data:image/svg+xml;base64,${qrCodeImage}');"></div>`);
    html.push('</section>');
  }

  html.push(`<div style="width:150px">${logoWithBranding().getHTML()}</div>`);

  const coverPageContainer = document.createElement('section');
  coverPageContainer.setAttribute('style', `width:${PDF_COVER_PAGE_WIDTH}px;height:${PDF_COVER_PAGE_HEIGHT}px;padding:40px 20px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;align-items:center;font-family:'Open Sans',-apple-system,BlinkMacSystemFont,sans-serif;${textColor}`);
  coverPageContainer.innerHTML = html.join('');

  return coverPageContainer;
};

export default getPDFCoverPage;
