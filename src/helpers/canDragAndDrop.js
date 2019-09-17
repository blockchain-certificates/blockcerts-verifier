let testedOnce = false;
let canDragAndDropCache = false;

export default function canDragAndDrop () {
  if (testedOnce) {
    return canDragAndDropCache;
  }
  testedOnce = true;

  const testDiv = document.createElement('div');
  if ('ondragenter' in testDiv) {
    console.log('yeah yeah drag me over');
    canDragAndDropCache = true;
    return canDragAndDropCache;
  }
}
