export default function isJson (candidate: string): boolean {
  try {
    JSON.parse(candidate);
    return true;
  } catch (e) {
    return false;
  }
}
