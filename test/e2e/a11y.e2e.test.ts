import { fixture, html, expect } from '@open-wc/testing';
import '../../dist/ie11';

describe('Blockcerts Verifier a11y test suite', function () {
  it('passes the a11y audit', async function () {
    const element = await fixture(html`
      <blockcerts-verifier></blockcerts-verifier>
    `);
    await expect(element).shadowDom.to.be.accessible();
  });
});
