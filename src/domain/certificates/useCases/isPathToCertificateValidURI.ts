import { isValidLocalPath, isValidUrl } from '../../../helpers/validations';

export default function isPathToCertificateValidURI (path: string): boolean {
  return isValidUrl(path) || isValidLocalPath(path);
}
