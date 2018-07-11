import downloadFlag from '../../../constants/downloadFlag';

export default function download (url) {
  const lmRegex = /learningmachine\.(io|com)\/certificate/;

  if (url.match(lmRegex)) {
    return url + downloadFlag;
  }
}
