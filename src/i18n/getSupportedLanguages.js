import en from './lang/en.json';
import fr from './lang/fr.json';

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
