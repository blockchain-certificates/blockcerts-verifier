import { html, fixture, expect } from '@open-wc/testing';
import '../../dist/main';
import { wait } from './helpers/waitForKarma';

describe('BlockcertsVerifier display test suite', function () {
  describe('when the selected mode is card (default)', async function () {
    let element;
    before(async function () {
      this.timeout(10000);
      element = await fixture(html`
        <blockcerts-verifier 
                src="https://blockcerts.learningmachine.com/certificate/d33386de004c5520aa1f6e2d3926785f"
                disable-auto-verify
                disable-verify
        ></blockcerts-verifier>
      `);
      await wait(3000);
    });

    it('should show the card display component', function () {
      const cardComponent = element.shadowRoot
        .querySelectorAll('buv-raw')[0].shadowRoot
        .querySelectorAll('buv-card-certificate');

      void expect(cardComponent.length).to.equal(1);
    });

    it('should not show the full display component', function () {
      const fullCertificateComponent = element.shadowRoot
        .querySelectorAll('buv-raw')[0].shadowRoot
        .querySelectorAll('buv-full-certificate');

      void expect(fullCertificateComponent.length).to.equal(0);
    });

    it('should not show the fullscreen display component', function () {
      const fullscreenCertificateComponent = element.shadowRoot
        .querySelectorAll('buv-raw')[0].shadowRoot
        .querySelectorAll('buv-fullscreen-certificate');

      void expect(fullscreenCertificateComponent.length).to.equal(0);
    });
  });
});
