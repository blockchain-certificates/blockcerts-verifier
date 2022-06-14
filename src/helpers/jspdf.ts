import jsPDF, { jsPDFOptions } from 'jspdf';

export function getPageOrientation (width: number, height: number): jsPDFOptions['orientation'] {
  return width > height ? 'landscape' : 'portrait';
}

export function savePDF (pdf: jsPDF, fileName: string): void {
  pdf.save(fileName);
}
