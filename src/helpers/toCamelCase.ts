const dashes = /(-\w)/g;
const convertToUpperCase = (matches: string): string => matches[1].toUpperCase();

export function snakeToCamelCase (string: string): string {
  return string.replace(dashes, convertToUpperCase);
}
