export function isValidUrl (url: string): boolean {
  // https://stackoverflow.com/a/15734347/4064775
  const regex = /^(ftp|http|https):\/\/[^ "]+$/;
  return regex.test(url);
}

export function isValidLocalPath (path: string): boolean {
  const regex = /^(\.\/|\.\.\/|[A-Z]:\/\/|\/)[^ "]+$/;
  return regex.test(path);
}
