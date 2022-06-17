import addCSSPropertiesToHTMLElement, { TCSSPropertiesObject } from '../../../src/helpers/cssProperties';

describe('addCSSPropertiesToHTMLElement function', function () {
  it('should add the style properties to the html element', function () {
    const mockHtmlElement: HTMLElement = document.createElement('div');
    const fixtureStyleProperties: TCSSPropertiesObject = {
      width: '100px'
    };
    addCSSPropertiesToHTMLElement(mockHtmlElement, fixtureStyleProperties);

    expect(mockHtmlElement.style.width).toBe('100px');
  });
});
