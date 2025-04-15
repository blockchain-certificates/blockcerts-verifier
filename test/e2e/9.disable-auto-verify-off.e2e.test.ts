import { html, fixture, expect } from '@open-wc/testing';
import '../../dist/main';
import { wait } from './helpers/waitForKarma';

describe('BlockcertsVerifier attributes test suite', function () {
  describe('given a certificate was loaded', async function () {
    describe('and the disable-auto-verify flag is not set', function () {
      it('should start the verification process immediately', async function () {
        this.timeout(10000);
        const element = await fixture(html`
          <blockcerts-verifier 
                  src="https://blockcerts.learningmachine.com/certificate/d33386de004c5520aa1f6e2d3926785f"
                  display-mode="fullscreen"
          ></blockcerts-verifier>
        `);
        await wait(3000);

        const modalElement = element.shadowRoot.querySelectorAll('buv-raw')[0].shadowRoot
          .querySelectorAll('buv-verification-modal')[0].shadowRoot
          .querySelectorAll('buv-modal')[0].shadowRoot
          .querySelectorAll('.buv-qa-modal')[0];

        await wait(300);
        expect(modalElement.classList.contains('is-hidden')).to.equal(false);
      });
    });
  });
});
