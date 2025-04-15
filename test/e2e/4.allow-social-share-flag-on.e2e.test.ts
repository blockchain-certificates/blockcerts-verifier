import { html, fixture, expect } from '@open-wc/testing';
import '../../dist/main';
import { wait } from './helpers/waitForKarma';

describe('BlockcertsVerifier flag options test suite', function () {
  describe('given allow-social-share flag is specified', function () {
    it('should show the social share link component', async function () {
      this.timeout(10000);
      const element = await fixture(html`
        <blockcerts-verifier 
                display-mode="fullscreen" 
                src="https://blockcerts.learningmachine.com/certificate/d33386de004c5520aa1f6e2d3926785f"
                disable-auto-verify
                disable-verify
                allow-social-share
        ></blockcerts-verifier>
      `);
      await wait(3000);
      const socialShareComponent = element.shadowRoot
        .querySelectorAll('buv-raw')[0].shadowRoot
        .querySelectorAll('buv-fullscreen-certificate')[0].shadowRoot
        .querySelectorAll('buv-fullscreen-certificate-raw')[0].shadowRoot
        .querySelectorAll('buv-social-share');

      await wait(300);

      void expect(socialShareComponent.length).to.equal(1);
    });
  });
});
