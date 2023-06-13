import en from './lang/en';
import es from './lang/es';
import fr from './lang/fr';
import it from './lang/it';

const i18n = {
  en,
  es,
  fr,
  it
};

export default function getSupportedLanguages (): string[] {
  return Object.keys(i18n);
}

export function getLanguagesTexts (): any { // return language file object, not typed at this point
  return i18n;
}
