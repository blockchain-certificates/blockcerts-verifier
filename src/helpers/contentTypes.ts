import { CONTENT_TYPES } from '../constants/contentTypes';

const isContentTypeImage = (contentType: CONTENT_TYPES) => {
  const imagesContentTypes: CONTENT_TYPES[] = [
    CONTENT_TYPES.IMAGE_GIF,
    CONTENT_TYPES.IMAGE_BMP,
    CONTENT_TYPES.IMAGE_PNG,
    CONTENT_TYPES.IMAGE_JPEG
  ];

  return imagesContentTypes.includes(contentType);
};

export default isContentTypeImage;
