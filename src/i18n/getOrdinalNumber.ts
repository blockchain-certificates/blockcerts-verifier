import currentLocale from './valueObjects/currentLocale';
import getText from './getText';

function getOrdinalSuffixesForEnglish (n: number): string {
  const suffixes = getText('numbers', 'ordinal');
  const variation = n % 100;
  return suffixes[(variation - 20) % 10] || suffixes[variation] || suffixes[0];
}

function getOrdinalSuffixesForFrench (n: number): string {
  const suffixes = getText('numbers', 'ordinal');
  if (n === 1) {
    return suffixes[n];
  }
  return suffixes[0];
}

const ordinalSuffixesForLocale: {
  [languageKey: string]: (n?: number) => string;
} = {
  en: getOrdinalSuffixesForEnglish,
  fr: getOrdinalSuffixesForFrench,
  es: () => getText('numbers', 'ordinal'),
  it: () => getText('numbers', 'ordinal'),
  mt: (n) => getText('numbers', 'ordinal')[n - 1]
};

export default function getOrdinalNumber (n: number): string {
  if (currentLocale.locale === 'mt') {
    return ordinalSuffixesForLocale[currentLocale.locale](n); // no digit
  }
  return n + ordinalSuffixesForLocale[currentLocale.locale](n);
}
