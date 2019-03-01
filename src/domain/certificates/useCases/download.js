import downloadFlag from '../../../constants/downloadFlag';

export default function download (url) {
  return url + downloadFlag;
}
