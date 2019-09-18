let testedOnce = false;
let canDragAndDropCache = false;

export default function canDragAndDrop () {
  if (testedOnce) {
    return canDragAndDropCache;
  }
  testedOnce = true;

  const testDiv = document.createElement('div');

  if (!('ontouchstart' in testDiv)) { // check if most likely mobile device.
    canDragAndDropCache = true;
    return canDragAndDropCache;
  }

  return false;
}
