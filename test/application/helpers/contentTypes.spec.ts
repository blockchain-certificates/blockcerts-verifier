import isContentTypeImage from '../../../src/helpers/contentTypes';
import { CONTENT_TYPES } from '../../../src/constants/contentTypes';

describe('isContentTypeImage function', function () {
  describe('given the content type passed is of image', function () {
    it('should return true', function () {
      expect(isContentTypeImage(CONTENT_TYPES.IMAGE_JPEG)).toBe(true);
    });
  });

  describe('given the content type passed is not of image', function () {
    it('should return false', function () {
      expect(isContentTypeImage(CONTENT_TYPES.APPLICATION_PDF)).toBe(false);
    });
  });
});
