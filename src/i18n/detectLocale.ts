export const defaultLocale = 'en';

export default function detectLocale (): string {
  return navigator.language || (navigator as any).userLanguage || (navigator as any).browserLanguage || defaultLocale;
}
