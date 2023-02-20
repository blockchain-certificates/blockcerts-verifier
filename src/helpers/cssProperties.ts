export type TCSSPropertiesObject = { [key: string]: string };

const addCSSPropertiesToHTMLElement = (htmlElement: HTMLElement, cssProperties: TCSSPropertiesObject): void => {
  Object.keys(cssProperties).forEach((propertyKey: string): void => {
    htmlElement.style[propertyKey] = cssProperties[propertyKey];
  });
};

export default addCSSPropertiesToHTMLElement;
