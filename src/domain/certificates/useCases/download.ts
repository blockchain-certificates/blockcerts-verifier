import downloadFlag from '../../../constants/downloadFlag';

export default function download (url: string): string {
  return url + downloadFlag;
}
