const SEPARATOR = '.';

/** getValueFrom
 * parses an object to find the value of the entry
 * @param list: Object
 * @param entry: String. Is the form of 'path.to.my.key'
 * @returns {*}
 *    if list.path.to.my.key exists, will return its value
 *    otherwise undefined
 */

export default function getValueFrom (list, entry) {
  const entryPath = entry.split(SEPARATOR);

  function getListSubkey (list, key, path) {
    const nextIndex = path.indexOf(key) + 1;
    const nextKey = path[nextIndex];

    if (!nextKey) {
      return list[key];
    }

    if (Object.prototype.hasOwnProperty.call(list[key], nextKey)) {
      return getListSubkey(list[key], nextKey, path);
    }
  }

  return getListSubkey(list, entryPath[0], entryPath);
}
