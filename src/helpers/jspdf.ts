import jsPDF, { ImageCompression, jsPDFOptions } from 'jspdf';
import html2canvas from 'html2canvas';
import { TElementSize } from './getHTMLElementSize';
import getImageSize from './getImageSize';

export const PDF_MARGIN = 10;
export const PDF_IMAGE_MARGIN = 0;
export const HTML2PDF_IMAGE_COMPRESSION: ImageCompression = 'FAST';

export function getPageOrientation (width: number, height: number): jsPDFOptions['orientation'] {
  return width > height ? 'landscape' : 'portrait';
}

export function savePDF (pdf: jsPDF, fileName: string): void {
  pdf.save(fileName);
}

export function addImageToPDF (pdf: jsPDF, imageData: string, width: number, height: number, x: number, y: number, compression: ImageCompression): jsPDF {
  pdf.addImage({
    imageData,
    format: 'PNG',
    x,
    y,
    width,
    height,
    compression
  });

  return pdf;
}

export async function addHTMLPageToPDF (
  { pdf, pageHTMLElement, width, height, margin = 0 }:
  { pdf?: jsPDF; pageHTMLElement: HTMLElement; width: number; height: number; margin: number }
): Promise<jsPDF> {
  const pdfPageSize = {
    width: width + 2 * margin,
    height: height + 2 * margin
  };

  const canvas: HTMLCanvasElement = await html2canvas(pageHTMLElement, { scale: 2 });
  const imageData: string = canvas.toDataURL('image/png', 1);
  const orientation: jsPDFOptions['orientation'] = getPageOrientation(width, height);

  if (!pdf) {
    // eslint-disable-next-line new-cap
    pdf = new jsPDF({
      unit: 'px',
      hotfixes: ['px_scaling'],
      format: [pdfPageSize.width, pdfPageSize.height],
      orientation
    });
  } else {
    pdf.addPage([pdfPageSize.width, pdfPageSize.height], orientation);
  }

  pdf = addImageToPDF(pdf, imageData, width, height, PDF_MARGIN, PDF_MARGIN, HTML2PDF_IMAGE_COMPRESSION);

  return pdf;
}

export async function generatePdfFromImage (pdf: jsPDF, imageData: string): Promise<jsPDF> {
  const { width, height }: TElementSize = await getImageSize(imageData);
  const orientation: jsPDFOptions['orientation'] = getPageOrientation(width, height);
  pdf.addPage([width, height], orientation);
  return addImageToPDF(pdf, imageData, width, height, PDF_IMAGE_MARGIN, PDF_IMAGE_MARGIN, HTML2PDF_IMAGE_COMPRESSION);
}
