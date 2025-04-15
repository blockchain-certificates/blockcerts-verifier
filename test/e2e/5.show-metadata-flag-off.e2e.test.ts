import { html, fixture, expect } from '@open-wc/testing';
import '../../dist/main';
import { wait } from './helpers/waitForKarma';

describe('BlockcertsVerifier flag options test suite', function () {
  describe('given show-metadata flag is not specified', function () {
    xit('should hide the metadata link component', async function () {
      this.timeout(10000);
      const element = await fixture(html`
        <blockcerts-verifier 
                display-mode="fullscreen" 
                src="https://blockcerts.learningmachine.com/certificate/d33386de004c5520aa1f6e2d3926785f"
                disable-auto-verify
                disable-verify
        ></blockcerts-verifier>
      `);
      await wait(1000);
      const showMetadataComponent = element.shadowRoot
        .querySelectorAll('buv-raw')[0].shadowRoot
        .querySelectorAll('buv-fullscreen-certificate')[0].shadowRoot
        .querySelectorAll('buv-fullscreen-certificate-raw')[0].shadowRoot
        .querySelectorAll('buv-metadata');

      await wait(300);
      // TODO investigate why this is not getting the expected result
      void expect(showMetadataComponent.length).to.equal(0);
    });
  });
});
