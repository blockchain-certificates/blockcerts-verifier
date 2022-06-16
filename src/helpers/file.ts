import { CONTENT_TYPES } from '../constants/contentTypes';

export function forceDownloadFile (content: string, contentType: string, contentEncoding: string, fileName: string, fileExtension = ''): void {
  const linkSource = `data:${contentType};${contentEncoding},${content}`;
  const downloadLink = document.createElement('a');
  const fileNameParts: string[] = [fileName];
  if (fileExtension) {
    fileNameParts.push(fileExtension);
  }
  const downloadFileName = fileNameParts.join('.');

  downloadLink.href = linkSource;
  downloadLink.download = downloadFileName;
  downloadLink.click();
}

export function getFileExtensionFromContentType (contentType: string): string {
  switch (contentType) {
    case CONTENT_TYPES.APPLICATION_PDF:
      return 'pdf';
    default:
      return '';
  }
}
