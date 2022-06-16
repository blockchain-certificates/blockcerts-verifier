export function forceDownloadFile (content: string, contentType: string, contentEncoding: string, fileName: string, fileExtension: string): void {
  const linkSource = `data:${contentType};${contentEncoding},${content}`;
  const downloadLink = document.createElement('a');
  const pdfFileName = `${fileName}.${fileExtension}`;

  downloadLink.href = linkSource;
  downloadLink.download = pdfFileName;
  downloadLink.click();
}
