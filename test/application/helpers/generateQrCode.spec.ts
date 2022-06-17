import generateQrCode from '../../../src/helpers/generateQrCode';
import assertionQrCode from './assertions/assertion-qr-code';

describe('generateQrCode function', function () {
  describe('given the text content is null', function () {
    it('should return null', function () {
      expect(generateQrCode(null)).toBeNull();
    });
  });

  describe('given the text content is not null', function () {
    it('should return the QRCode SVG element as string encoded in base64', function () {
      expect(generateQrCode('mock-text-content')).toBe(assertionQrCode);
    });
  });
});
