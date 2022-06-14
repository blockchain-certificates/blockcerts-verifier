import { getHTMLElementSize } from '../../../src/helpers/getHTMLElementSize';

describe('getHTMLElementSize function test suite', function () {
  it('should return offset width and height of the HTML element', function () {
    const fixtureHTMLElement: Partial<HTMLElement> = {
      offsetWidth: 200,
      offsetHeight: 100
    };

    expect(getHTMLElementSize(fixtureHTMLElement as HTMLElement)).toEqual({
      width: 200,
      height: 100
    });
  });
});
