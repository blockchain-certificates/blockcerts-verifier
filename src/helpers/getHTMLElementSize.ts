export type TElementSize = {
  width: number;
  height: number;
};

export function getHTMLElementSize (htmlElement: HTMLElement): TElementSize {
  const { offsetWidth, offsetHeight } = htmlElement;

  return {
    width: offsetWidth,
    height: offsetHeight
  };
}
