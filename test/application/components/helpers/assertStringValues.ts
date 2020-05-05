import { TemplateResult } from 'lit-html';

export function assertClassInStringBits (instance: TemplateResult, className: string): boolean {
  return instance.values.some(value => {
    if (typeof value === 'string') {
      return value.indexOf(className) > -1;
    }

    if (value == null) {
      return false;
    }

    if (value.strings == null) {
      return false;
    }

    return value.strings.some(string => {
      if (string.indexOf('<style>') > -1) {
        return false;
      }

      return string.indexOf(className) > -1;
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
          return value.indexOf(string) > -1;
        }
        return false;
      });
    }

    return assertStringInValues(value, string);
  });
}
