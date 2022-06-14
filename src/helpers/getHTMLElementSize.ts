type TPageSize = {
  width: number;
  height: number;
};

export function getHTMLElementSize (htmlElement: HTMLElement): TPageSize {
  const { offsetWidth, offsetHeight } = htmlElement;

  return {
    width: offsetWidth,
    height: offsetHeight
  };
}
