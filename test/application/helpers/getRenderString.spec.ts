import getRenderString from '../../../src/helpers/getRenderString';
import { html } from 'lit-html';

describe('getRenderString function', function () {
  it('should return a TemplateResult as a string', function () {
    expect(getRenderString(html`<div>Hello World</div>`)).toBe('<div>Hello World</div>');
  });
});
