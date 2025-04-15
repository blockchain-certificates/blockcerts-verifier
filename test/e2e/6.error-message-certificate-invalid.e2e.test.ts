import { html, fixture, expect } from '@open-wc/testing';
import '../../dist/main';
import { wait } from './helpers/waitForKarma';

describe('BlockcertsVerifier error message test suite', function () {
  describe('when the credential passed is invalid', async function () {
    let element;
    before(async function () {
      element = await fixture(html`
        <blockcerts-verifier 
                display-mode="fullscreen" 
                src="https://www.blockcerts.org/schema/2.0/context.json"
                disable-auto-verify
                disable-verify
        ></blockcerts-verifier>
      `);
      await wait(1000);
    })

    it('should show the error message', async function () {
      this.timeout(10000);
      const errorMessageComponent = element.shadowRoot
        .querySelectorAll('buv-raw')[0].shadowRoot
        .querySelectorAll('.buv-qa-error-message');

      void expect(errorMessageComponent.length).to.equal(1);
    });

    it('should disable the main button', async function () {
      this.timeout(10000);
      const buttonElement = element.shadowRoot
        .querySelectorAll('buv-raw')[0].shadowRoot
        .querySelectorAll('buv-certificate-input')[0].shadowRoot
        .querySelectorAll('buv-verify-button')[0].shadowRoot
        .querySelectorAll('button')[0];

      void expect(buttonElement.disabled).to.be.true;
    });
  });
});
