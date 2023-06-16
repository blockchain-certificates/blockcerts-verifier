import currentLocale from './valueObjects/currentLocale';
import detectLocale from './detectLocale';
import ensureIsSupported from './ensureIsSupported';

export default function setLocale (locale: string): void {
  if (locale === 'auto' || !locale) {
    locale = detectLocale();
  }

  currentLocale.locale = ensureIsSupported(locale);
}
