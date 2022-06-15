import QRCode from 'qrcode-svg';
import toBase64 from './base64';

const generateQrCode = (textContent: string): string => {
  if (!textContent) {
    return null;
  }
  return toBase64(new QRCode(textContent).svg());
};

export default generateQrCode;
