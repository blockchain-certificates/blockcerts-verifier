import { TemplateResult } from 'lit-html';

export function assertClassInStringBits (instance: TemplateResult, className: string): boolean {
  return instance.values.some(value => {
    if (typeof value === 'string') {
      return value.includes(className);
    }

    if (value == null) {
      return false;
    }

    if (value.strings == null) {
      return false;
    }

    return value.strings.some(string => {
      if (string.includes('<style>')) {
        return false;
      }

      return string.includes(className);
    });
  });
}

export function assertStringInValues (instance: TemplateResult, string: string): boolean {
  return instance?.values.some(value => {
    if (value == null) {
      return false;
    }

    if (value.values == null) {
      return false;
    }

    if (Array.isArray(value.values)) {
      return value.values.some(value => {
        if (typeof value === 'string') {
          return value.includes(string);
        }
        return false;
      });
    }

    return assertStringInValues(value, string);
  });
}
