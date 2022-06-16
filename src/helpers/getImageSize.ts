import { TElementSize } from './getHTMLElementSize';

const getImageSize = async (imageSource: string): Promise<TElementSize> => {
  return await new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.src = imageSource;
  });
};

export default getImageSize;
