import { html, fixture, expect } from '@open-wc/testing';
import '../../dist/main';
import { wait } from './helpers/waitForKarma';

describe('BlockcertsVerifier error message test suite', function () {
  describe('when the credential passed is valid', async function () {
    let element;
    before(async function () {
      this.timeout(10000);
      element = await fixture(html`
        <blockcerts-verifier 
                display-mode="fullscreen" 
                src="https://blockcerts.learningmachine.com/certificate/d33386de004c5520aa1f6e2d3926785f"
                disable-auto-verify
                disable-verify
        ></blockcerts-verifier>
      `);
      await wait(3000);
    });

    it('should not show the error message', async function () {
      const errorMessageComponent = element.shadowRoot
        .querySelectorAll('buv-raw')[0].shadowRoot
        .querySelectorAll('.buv-qa-error-message');

      void expect(errorMessageComponent.length).to.equal(0);
    });

    it('should hide the url input element', async function () {
      const certificateInputComponent = element.shadowRoot
        .querySelectorAll('buv-raw')[0].shadowRoot
        .querySelectorAll('buv-certificate-input')[0];

      const children = [].slice.call(certificateInputComponent.shadowRoot.children);
      const hasCertificateInput = children.some(el => el.classList.contains('buv-qa-certificate-input'));
      expect(hasCertificateInput).to.equal(false);
    });
  });
});
