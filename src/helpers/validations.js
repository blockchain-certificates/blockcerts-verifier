export function isValidUrl (url) {
  // https://stackoverflow.com/a/15734347/4064775
  const regex = /^(ftp|http|https):\/\/[^ "]+$/;
  return regex.test(url);
}

export function isValidLocalPath (path) {
  const regex = /^(\.\/|\.\.\/|[A-Z]:\/\/|\/)[^ "]+$/;
  return regex.test(path);
}
