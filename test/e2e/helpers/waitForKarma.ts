// eslint-disable-next-line no-unused-vars
export async function wait (n) {
  return await new Promise((resolve, reject) => setTimeout(resolve, n));
}
