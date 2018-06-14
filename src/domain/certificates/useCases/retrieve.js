function isValidUrl (url) {
  // https://stackoverflow.com/a/15734347/4064775
  const regex = /^(ftp|http|https):\/\/[^ "]+$/;
  return regex.test(url);
}

export default function retrieve (url) {
  if (!isValidUrl(url)) {
    console.error('Invalid url to retrieve:', url);
    return null;
  }

  const param = '?format=json';
  const urlWithParam = url + param;

  return fetch(urlWithParam)
    .then(res => res.json());
}
