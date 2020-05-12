import { html, fixture, expect } from '@open-wc/testing';
import '../../dist/ie11';

describe('BlockcertsVerifier', function () {
  let element;
  beforeEach(async function () {
    element = await fixture(html`
      <blockcerts-verifier></blockcerts-verifier>
    `);
  });

  it('renders a h1', function () {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1.textContent).to.equal('My app');
  });

  it('passes the a11y audit', async function () {
    await expect(element).shadowDom.to.be.accessible();
  });
});
