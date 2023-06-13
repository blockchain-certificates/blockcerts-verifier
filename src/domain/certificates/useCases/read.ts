async function readFile (file: File): Promise<string> {
  return await new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.onload = function (e) {
      resolve(e.target.result as string); // TODO: check type correctly
    };
    reader.onerror = reader.onabort = reject;
    reader.readAsText(file);
  });
}

export default async function read (file: File): Promise<string> {
  if (!file) {
    return;
  }

  const result = await readFile(file);

  return result;
}
