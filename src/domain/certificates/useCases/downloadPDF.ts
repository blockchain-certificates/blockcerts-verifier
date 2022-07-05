import { CONTENT_TYPES } from '../../../constants/contentTypes';
import jsPDF from 'jspdf';
import { getHTMLElementSize } from '../../../helpers/getHTMLElementSize';
import { addHTMLPageToPDF, generatePdfFromImage, PDF_MARGIN, savePDF } from '../../../helpers/jspdf';
import getPDFCoverPage, { PDF_COVER_PAGE_HEIGHT, PDF_COVER_PAGE_WIDTH } from '../../../helpers/getPDFCoverPage';
import addCSSPropertiesToHTMLElement, { TCSSPropertiesObject } from '../../../helpers/cssProperties';
import displayHtmlHasNoWidthConstraint from './displayHtmlHasNoWidthConstraint';
import generateQrCode from '../../../helpers/generateQrCode';
import isContentTypeImage from '../../../helpers/contentTypes';
import { forceDownloadFile, getFileExtensionFromContentType } from '../../../helpers/file';

const HTML2PDF_DOM_CONTAINER_ID = 'html2pdf-dom-container-identifier';
const HTML2PDF_CONTAINER_HIDE_STYLE = {
  overflow: 'hidden',
  left: '-1000px'
};
const HTML2PDF_CONTAINER_STYLE = {
  position: 'absolute',
  padding: '20px',
  'background-color': '#fff',
  'font-family': 'serif',
  'text-align': 'center',
  color: '#49555f',
  'font-size': '12px',
  'word-wrap': 'break-word',
  'min-height': 'calc(100vh - 145px)',
  'box-sizing': 'border-box',
  margin: '0 auto',
  'min-width': '600px',
  'line-height': 'initial',
  clipPath: 'inset(0 100% 0 0)'
};
const HTML2PDF_CONTAINER_LEGACY_STYLE = {
  'max-width': '460px'
};

const generateCoverPage = async (
  recipientName: string,
  certificateTitle: string,
  issueDate: string,
  issuerName: string,
  issuerLogo: string,
  recordLink: string,
  issuerPublicKey: string[],
  issuerPublicDomain: string[],
  issuerPublicUrl: string[]
): Promise<jsPDF> => {
  const htmlContainer: HTMLElement = createDomContainer(HTML2PDF_CONTAINER_HIDE_STYLE);

  const qrCodeImage: string = generateQrCode(recordLink);

  const coverPageHTML: HTMLElement = getPDFCoverPage({
    certificateTitle,
    issueDate,
    issuerName,
    issuerLogo,
    issuerPublicKey,
    issuerPublicDomain,
    issuerPublicUrl,
    recipientName,
    qrCodeImage
  });
  htmlContainer.appendChild(coverPageHTML);

  const pdf: jsPDF = await addHTMLPageToPDF({
    pageHTMLElement: coverPageHTML,
    width: PDF_COVER_PAGE_WIDTH,
    height: PDF_COVER_PAGE_HEIGHT,
    margin: 0
  });

  deleteDomContainer(htmlContainer);

  return pdf;
};

const extractHtmlLayoutFromContainer = (htmlLayout: HTMLElement, isLayoutLegacy: boolean): HTMLElement[] => {
  // DOM Path is static, always the same (set in legacy display)
  return isLayoutLegacy
    ? [htmlLayout]
    : Array.from(htmlLayout.querySelectorAll(':scope > div > div'));
};

const generateLayoutPages = async (pdf: jsPDF, pagesContent: string): Promise<jsPDF> => {
  const isLayoutLegacy: boolean = displayHtmlHasNoWidthConstraint(pagesContent);
  const htmlContainer: HTMLElement = createDomContainer({
    ...HTML2PDF_CONTAINER_STYLE,
    ...HTML2PDF_CONTAINER_HIDE_STYLE,
    ...(isLayoutLegacy ? HTML2PDF_CONTAINER_LEGACY_STYLE : {})
  });

  htmlContainer.insertAdjacentHTML('beforeend', pagesContent);

  const pages: HTMLElement[] = extractHtmlLayoutFromContainer(htmlContainer, isLayoutLegacy);

  for (const page of pages) {
    const pageSize = getHTMLElementSize(page);
    pdf = await addHTMLPageToPDF({
      pdf,
      pageHTMLElement: page,
      width: pageSize.width,
      height: pageSize.height,
      margin: PDF_MARGIN
    });
  }

  deleteDomContainer(htmlContainer);

  return pdf;
};

const createDomContainer = (containerStyles?: TCSSPropertiesObject): HTMLElement => {
  const html2pdfDomContainer: HTMLElement = document.createElement('div');
  html2pdfDomContainer.setAttribute('id', HTML2PDF_DOM_CONTAINER_ID);

  if (containerStyles) {
    addCSSPropertiesToHTMLElement(html2pdfDomContainer, containerStyles);
  }

  document.body.appendChild(html2pdfDomContainer);

  return html2pdfDomContainer;
};

const deleteDomContainer = (container: HTMLElement): void => {
  document.body.removeChild(container);
};

const generatePdfDocument = async ({
  contentType = null,
  contentEncoding = '',
  content = '',
  recipientName = '',
  certificateTitle = '',
  issueDate = '',
  issuerName = '',
  issuerLogo = '',
  recordLink = '',
  issuerPublicKey = [],
  issuerProfileUrl = [],
  issuerProfileDomain = []
}: IDownloadPdfParameters): Promise<void> => {
  const fileName: string = certificateTitle;
  let pdf: jsPDF;

  const isContentAnImage: boolean = isContentTypeImage(contentType);
  const isContentHTML: boolean = contentType === CONTENT_TYPES.TEXT_HTML;
  const shouldHaveCoverPage: boolean = isContentHTML || isContentAnImage;

  if (shouldHaveCoverPage) {
    pdf = await generateCoverPage(
      recipientName,
      certificateTitle,
      issueDate,
      issuerName,
      issuerLogo,
      recordLink,
      issuerPublicKey,
      issuerProfileDomain,
      issuerProfileUrl
    );
  }

  if (isContentHTML) {
    pdf = await generateLayoutPages(pdf, content);
  } else if (isContentAnImage) {
    pdf = await generatePdfFromImage(pdf, `data:${contentType};${contentEncoding},${content}`);
  } else {
    const extension: string = getFileExtensionFromContentType(CONTENT_TYPES.APPLICATION_PDF);
    forceDownloadFile(content, contentType, contentEncoding, fileName, extension);
  }

  savePDF(pdf, fileName);
};

export interface IFirstCoverInfo {
  recipientName?: string;
  certificateTitle?: string;
  issueDate?: string;
  issuerName?: string;
  issuerLogo?: string;
  recordLink?: string;
  issuerPublicKey?: string[];
  issuerProfileDomain?: string[];
  issuerProfileUrl?: string[];
}

export interface IDownloadPdfParameters extends IFirstCoverInfo {
  contentType: CONTENT_TYPES;
  contentEncoding: string;
  content: string;
}

export default async function downloadPDF (downloadPdfParameters: IDownloadPdfParameters): Promise<void> {
  await generatePdfDocument(downloadPdfParameters);
}
