import { html, fixture, expect } from '@open-wc/testing';
import '../../dist/main';
import { wait } from './helpers/waitForKarma';

describe('BlockcertsVerifier attributes test suite', function () {
  describe('given a certificate was loaded', async function () {
    describe('and the disable-verify flag is set', function () {
      let element;

      before(async function () {
        this.timeout(10000);
        element = await fixture(html`
          <blockcerts-verifier 
                  src="https://blockcerts.learningmachine.com/certificate/d33386de004c5520aa1f6e2d3926785f"
                  display-mode="fullscreen"
                  disable-verify
                  disable-auto-verify
          ></blockcerts-verifier>
        `);
        await wait(3000);
      });

      it('should hide the verification modal', async function () {
        this.timeout(10000);
        const modalElement = element.shadowRoot.querySelectorAll('buv-raw')[0].shadowRoot
          .querySelectorAll('buv-verification-modal')[0].shadowRoot
          .querySelectorAll('buv-modal')[0];

        await wait(300);
        expect(modalElement.classList.contains('qa-isopen-true')).to.equal(false);
      });

      it('the verification should not occur and the final status should not be displayed', async function () {
        this.timeout(10000);
        const statusElement = element.shadowRoot.querySelectorAll('buv-raw')[0].shadowRoot
          .querySelectorAll('buv-fullscreen-certificate')[0].shadowRoot
          .querySelectorAll('buv-fullscreen-certificate-raw')[0].shadowRoot
          .querySelectorAll('buv-final-verification-step')[0].shadowRoot
          .querySelectorAll('.buv-qa-final-verification-step');

        await wait(300);
        expect(statusElement.length).to.equal(0);
      });
    });
  });
});
