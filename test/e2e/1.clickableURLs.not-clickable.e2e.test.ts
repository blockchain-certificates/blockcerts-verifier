import { html, fixture, expect } from '@open-wc/testing';
import '../../dist/main';
import { wait } from './helpers/waitForKarma';

describe('BlockcertsVerifier clickable e2e test suite', function () {
  describe('given the clickable url flag is not set', function () {
    describe('and the certificate displayHTML property has a url', function () {
      // disabling test as it does not pass sequentially (but ok in isolation) TODO: figure out why
      xit('should not make that url clickable', async function () {
        this.timeout(10000);
        const element = await fixture(html`
          <blockcerts-verifier display-mode="fullscreen" disable-verify disable-auto-verify src="https://blockcerts.learningmachine.com/certificate/d33386de004c5520aa1f6e2d3926785f"></blockcerts-verifier>
        `);
        await wait(3000);
        const linkElements = element.shadowRoot
          .querySelectorAll('buv-raw')[0].shadowRoot
          .querySelectorAll('buv-fullscreen-certificate')[0].shadowRoot
          .querySelectorAll('buv-fullscreen-certificate-raw')[0].shadowRoot
          .querySelectorAll('.qa-fullscreen-certificate')[0]
          .querySelectorAll('a');
        // eslint-disable-next-line no-void
        void expect(linkElements.length).to.equal(0);
      });
    });
  });
});
