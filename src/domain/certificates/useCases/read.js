function readFile (file) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.onload = function (e) {
      resolve(e.target.result);
    };
    reader.onerror = reader.onabort = reject;
    reader.readAsText(file);
  });
}

export default async function read (file) {
  if (!file) {
    return;
  }

  const result = await readFile(file);

  return result;
}
