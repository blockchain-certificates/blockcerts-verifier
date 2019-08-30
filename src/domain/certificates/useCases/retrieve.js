import { isValidLocalPath, isValidUrl } from '../../../helpers/validations';
import downloadFlag from '../../../constants/downloadFlag';

function handleError (error) {
  const errorMessage = 'errors.invalidBlockcertsUrl';
  console.error(error);
  return {
    certificateDefinition: null,
    errorMessage
  };
}

export default function retrieve (url) {
  if (!(isValidUrl(url) || isValidLocalPath(url))) {
    console.error('Invalid url to retrieve:', url);
    return null;
  }

  const urlWithParam = url + downloadFlag;

  return fetch(urlWithParam)
    .then(res => res.text())
    .then(text => {
      try {
        return {
          certificateDefinition: JSON.parse(text)
        };
      } catch (err) {
        return handleError(err);
      }
    })
    .catch(handleError);
}
