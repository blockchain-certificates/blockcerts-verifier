import i18n from '../../../i18n';

export default function getSupportedLanguages () {
  return Object.keys(i18n);
}

export function getLanguagesTexts () {
  return i18n;
}
