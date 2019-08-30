import currentLocale from './valueObjects/currentLocale';
import { getLanguagesTexts } from './getSupportedLanguages';

export default function getText (group, item = '', usePlural = false, count = 0) {
  if (!group) {
    return '';
  }

  if (group.indexOf('.') > -1) {
    const splittedGroup = group.split('.');
    group = splittedGroup[0];
    item = splittedGroup[1];
  }

  if (!item) {
    return '';
  }

  if (usePlural && count > 1) {
    item += 'Plural';
  }

  const i18n = getLanguagesTexts();

  if (!i18n[currentLocale.locale]) {
    return '[missing locale data]';
  }

  if (!i18n[currentLocale.locale][group]) {
    return '[missing locale group data]';
  }

  if (!i18n[currentLocale.locale][group][item]) {
    return '[missing locale item data]';
  }

  return i18n[currentLocale.locale][group][item] || '';
}
