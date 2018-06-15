import * as ACTIONS from '../constants/actionTypes';

function isValidUrl (url) {
  // https://stackoverflow.com/a/15734347/4064775
  const regex = /^(ftp|http|https):\/\/[^ "]+$/;
  return regex.test(url);
}

export default function validateUrlInput (url) {
  const isValid = isValidUrl(url);
  return {
    type: ACTIONS.VALIDATE_URL_INPUT,
    payload: {
      isValid
    }
  };
}
