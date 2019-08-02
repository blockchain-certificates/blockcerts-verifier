export function assertClassInStringBits (instance, className) {
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

export function assertStringInValues (instance, string) {
  return instance.values.some(value => {
    if (value == null) {
      return false;
    }

    if (value.values == null) {
      return false;
    }

    return value.values.indexOf(string) > -1;
  });
}
