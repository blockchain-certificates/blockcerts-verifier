import en from './lang/en.js';
import es from './lang/es.js';
import fr from './lang/fr.js';
import it from './lang/it.js';

const i18n = {
  en,
  es,
  fr,
  it
};

export default function getSupportedLanguages () {
  return Object.keys(i18n);
}

export function getLanguagesTexts () {
  return i18n;
}
