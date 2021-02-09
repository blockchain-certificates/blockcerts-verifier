import { html, fixture, expect } from '@open-wc/testing';
import '../../dist/ie11';
import { wait } from './helpers/waitForKarma';

describe('BlockcertsVerifier clickable urls e2e test suite', function () {
  describe('given the clickable url flag is not set', function () {
    describe('and the certificate displayHTML property has a url', function () {
      it('should not make that url clickable', async function () {
        this.timeout(10000);
        const element = await fixture(html`
          <blockcerts-verifier display-mode="fullscreen" disable-verify disable-auto-verify src="https://blockcerts.learningmachine.com/certificate/d33386de004c5520aa1f6e2d3926785f"></blockcerts-verifier>
        `);
        await wait(3000);
        const linkElements = element.shadowRoot
          .querySelectorAll('buv-raw')[0].shadowRoot
          .querySelectorAll('buv-fullscreen-certificate')[0].shadowRoot
          .querySelectorAll('.qa-fullscreen-certificate')[0]
          .querySelectorAll('a');
        expect(linkElements.length).to.equal(0);
      });
    });
  });

  describe('given the clickable url flag is set', function () {
    describe('and the certificate displayHTML property has a url', function () {
      it('should make that url clickable', async function () {
        this.timeout(10000);
        const element = await fixture(html`
          <blockcerts-verifier clickable-urls display-mode="fullscreen" disable-verify disable-auto-verify src="https://blockcerts.learningmachine.com/certificate/d33386de004c5520aa1f6e2d3926785f"></blockcerts-verifier>
        `);
        await wait(3000);
        const linkElements = element.shadowRoot
          .querySelectorAll('buv-raw')[0].shadowRoot
          .querySelectorAll('buv-fullscreen-certificate')[0].shadowRoot
          .querySelectorAll('.qa-fullscreen-certificate')[0]
          .querySelectorAll('a');
        expect(linkElements.length).to.equal(1);
      });
    });
  });
});
