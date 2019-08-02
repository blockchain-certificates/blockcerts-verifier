export function assertClassInStringBits (instance, className) {
  return instance.values.some(value => {
    if (value == null) {
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
