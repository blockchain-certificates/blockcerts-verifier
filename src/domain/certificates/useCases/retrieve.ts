import { isValidLocalPath, isValidUrl } from '../../../helpers/validations';
import downloadFlag from '../../../constants/downloadFlag';
import type { Blockcerts } from '@blockcerts/cert-verifier-js';

export interface RetrieveResult {
  certificateDefinition: Blockcerts;
  errorMessage?: string;
}

function handleError (): RetrieveResult {
  const errorMessage = 'errors.invalidBlockcertsUrl';
  return {
    certificateDefinition: null,
    errorMessage
  };
}

export default async function retrieve (url: string): Promise<RetrieveResult> {
  if (!(isValidUrl(url) || isValidLocalPath(url))) {
    console.error('Invalid url to retrieve:', url);
    return null;
  }

  const urlWithParam = url + downloadFlag;

  return await fetch(urlWithParam)
    .then(async res => await res.text())
    .then(text => {
      try {
        return {
          certificateDefinition: JSON.parse(text)
        };
      } catch (err) {
        console.log(err);
        return handleError();
      }
    })
    .catch(handleError);
}
