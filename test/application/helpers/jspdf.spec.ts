import { getPageOrientation } from '../../../src/helpers/jspdf';

describe('getPageOrientation function', function () {
  describe('given the width is greater than the height', function () {
    it('should return a landscape orientation', function () {
      expect(getPageOrientation(200, 100)).toBe('landscape');
    });
  });

  describe('given the height is greater than the width', function () {
    it('should return a portrait orientation', function () {
      expect(getPageOrientation(100, 200)).toBe('portrait');
    });
  });
});
