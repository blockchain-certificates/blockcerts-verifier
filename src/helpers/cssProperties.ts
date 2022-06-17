export type TCSSPropertiesObject = { [key: string]: string };

const addCSSPropertiesToHTMLElement = (htmlElement: HTMLElement, cssProperties: TCSSPropertiesObject) => {
  Object.keys(cssProperties).forEach((propertyKey: string) => {
    htmlElement.style[propertyKey] = cssProperties[propertyKey];
  });
};

export default addCSSPropertiesToHTMLElement;
