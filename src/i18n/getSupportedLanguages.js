import en from './lang/en.js';
import fr from './lang/fr.js';

const i18n = {
  en,
  fr
};

export default function getSupportedLanguages () {
  return Object.keys(i18n);
}

export function getLanguagesTexts () {
  return i18n;
}
