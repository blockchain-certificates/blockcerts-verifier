const dashes = /(-\w)/g;
const convertToUpperCase = matches => matches[1].toUpperCase();

export function snakeToCamelCase (string) {
  return string.replace(dashes, convertToUpperCase);
}
