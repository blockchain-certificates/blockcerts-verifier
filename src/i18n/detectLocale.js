export const defaultLocale = 'en';

export default function detectLocale () {
  return navigator.language || navigator.userLanguage || navigator.browserLanguage || defaultLocale;
}
