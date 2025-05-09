import { describe, expect, it } from 'vitest';
import isContentTypeImage from '../../../src/helpers/contentTypes';
import { CONTENT_MEDIA_TYPES } from '../../../src/constants/contentTypes';

describe('isContentTypeImage function', function () {
  describe('given the content type passed is of image', function () {
    it('should return true', function () {
      expect(isContentTypeImage(CONTENT_MEDIA_TYPES.IMAGE_JPEG)).toBe(true);
    });
  });

  describe('given the content type passed is not of image', function () {
    it('should return false', function () {
      expect(isContentTypeImage(CONTENT_MEDIA_TYPES.APPLICATION_PDF)).toBe(false);
    });
  });
});
