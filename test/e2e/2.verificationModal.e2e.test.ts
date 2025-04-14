import { html, fixture, expect } from '@open-wc/testing';
import '../../dist/main';
import { wait } from './helpers/waitForKarma';

describe('BlockcertsVerifier verification modal test suite', function () {
  describe('given the verification process has started', function () {
    describe('and the disable-auto-verify flag is not set', function () {
      it('should show the verification modal', async function () {
        this.timeout(10000);
        const element = await fixture(html`
          <blockcerts-verifier display-mode="fullscreen" src="https://blockcerts.learningmachine.com/certificate/d33386de004c5520aa1f6e2d3926785f"></blockcerts-verifier>
        `);
        await wait(3000);
        const modalElement = element.shadowRoot
          .querySelectorAll('buv-raw')[0].shadowRoot
          .querySelectorAll('buv-verification-modal')[0].shadowRoot
          .querySelectorAll('buv-modal')[0];

         
        void expect(modalElement.classList.contains('qa-isopen-true')).to.be.true;
      });
    });
  });
});
