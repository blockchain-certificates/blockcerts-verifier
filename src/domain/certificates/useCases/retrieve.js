export default function retrieve (url) {
  const param = '?format=json';
  const urlWithParam = url + param;

  return fetch(urlWithParam)
    .then(res => res.json())
}
