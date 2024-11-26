import { CONTENT_MEDIA_TYPES } from '../constants/contentTypes';

const isContentTypeImage = (contentType: CONTENT_MEDIA_TYPES): boolean => {
  const imagesContentTypes: CONTENT_MEDIA_TYPES[] = [
    CONTENT_MEDIA_TYPES.IMAGE_GIF,
    CONTENT_MEDIA_TYPES.IMAGE_BMP,
    CONTENT_MEDIA_TYPES.IMAGE_PNG,
    CONTENT_MEDIA_TYPES.IMAGE_JPEG
  ];

  return imagesContentTypes.includes(contentType);
};

export default isContentTypeImage;
