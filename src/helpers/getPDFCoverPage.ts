import { logoWithBranding } from '../components/atoms/BlockcertsLogo/BlockcertsLogo';

export const PDF_COVER_PAGE_WIDTH = 595;
export const PDF_COVER_PAGE_HEIGHT = 842;

const getPDFCoverPage = ({
  certificateTitle = '',
  issueDate = '',
  issuerName = '',
  recipientName = '',
  issuerPublicKey = '',
  issuerLogo = '',
  qrCodeImage = ''
}: {
  certificateTitle?: string;
  issueDate: string;
  recipientName: string;
  issuerName: string;
  issuerPublicKey: string;
  issuerLogo?: string;
  qrCodeImage?: string;
}): HTMLElement => {
  const html: string[] = [];

  if (certificateTitle || issuerLogo) {
    html.push('<section>');

    if (issuerLogo) {
      html.push(`<div style="margin:0 auto;width:120px;height:120px;background-repeat:no-repeat;background-position:center;background-size:contain;background-image:url('${issuerLogo}');"></div>`);
    }

    if (certificateTitle) {
      html.push(`<h2 style="margin:30px 0 20px">${certificateTitle}</h2>`);
    }

    html.push('</section>');
  }

  html.push('<section style="text-align:center">');
  html.push(`<div style="margin:15px 0"><dt style="margin-bottom:5px;text-transform:uppercase;font-weight:600;">Issue Date</dt><dd style="margin:0;word-break:break-all">${issueDate}</dd></div>`);
  html.push(`<div style="margin:15px 0"><dt style="margin-bottom:5px;text-transform:uppercase;font-weight:600;">Recipient</dt><dd style="margin:0;word-break:break-all">${recipientName}</dd></div>`);
  html.push(`<div style="margin:15px 0"><dt style="margin-bottom:5px;text-transform:uppercase;font-weight:600;">Issuer</dt><dd style="margin:0;word-break:break-all">${issuerName}</dd></div>`);
  html.push(`<div style="margin:15px 0"><dt style="margin-bottom:5px;text-transform:uppercase;font-weight:600;">Issuer's Public Key</dt><dd style="margin:0;word-break:break-all">${issuerPublicKey}</dd></div>`);
  html.push('</section>');

  if (qrCodeImage) {
    html.push('<section>');
    html.push('<span style="margin-bottom:15px;font-size:12px">Scan the QR code to verify the document.</span>');
    html.push(`<div style="margin:0 auto;width:120px;height:120px;background-repeat:no-repeat;background-position:center;background-size:contain;background-image:url('data:image/svg+xml;base64,${qrCodeImage}');"></div>`);
    html.push('</section>');
  }

  html.push(`<div style="width:150px">${logoWithBranding().getHTML()}</div>`);

  const coverPageContainer = document.createElement('section');
  coverPageContainer.setAttribute('style', `width:${PDF_COVER_PAGE_WIDTH}px;height:${PDF_COVER_PAGE_HEIGHT}px;padding:40px 20px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;align-items:center;font-family:'Open Sans',-apple-system,BlinkMacSystemFont,sans-serif;`);
  coverPageContainer.innerHTML = html.join('');

  return coverPageContainer;
};

export default getPDFCoverPage;
