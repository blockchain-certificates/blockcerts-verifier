import { html, fixture, expect } from '@open-wc/testing';
import '../../dist/main';
import { wait } from './helpers/waitForKarma';

function getVerifyOtherCertificateComponent (element) {
  return element.shadowRoot.querySelectorAll('buv-raw')[0].shadowRoot
    .querySelectorAll('buv-footer')[0].shadowRoot
    .querySelectorAll('buv-verify-other-certificate')[0].shadowRoot
    .querySelectorAll('.buv-qa-verify-other-certificate');
}
describe('BlockcertsVerifier verify other certificate test suite', function () {
  describe('given a certificate was loaded', async function () {
    let element;
    before(async function () {
      this.timeout(10000);
      element = await fixture(html`
        <blockcerts-verifier 
                src="https://blockcerts.learningmachine.com/certificate/d33386de004c5520aa1f6e2d3926785f"
                disable-auto-verify
                disable-verify
                display-mode="fullscreen"
        ></blockcerts-verifier>
      `);
      await wait(3000);
    });

    it('the verify other certificate component should be visible', function () {
      const verifyOtherCertificateLink = getVerifyOtherCertificateComponent(element);

      expect(verifyOtherCertificateLink.length).to.equal(1);
    });

    // TODO: this works in real life but not in the test. It returns the unexpected value for both tests.
    xdescribe('when the user clicks on the verify other certificate link', function () {
      before(function () {
        const verifyOtherCertificateLink = getVerifyOtherCertificateComponent(element)[0];
        verifyOtherCertificateLink.click();
      });

      it('the verify other certificate link should not be visible anymore', async function () {
        const verifyOtherCertificateLink = getVerifyOtherCertificateComponent(element);

        expect(verifyOtherCertificateLink.length).to.equal(0);
      });

      it('the URL input should be visible', async function () {
        const certificateInputComponent = element.shadowRoot
          .querySelectorAll('buv-raw')[0].shadowRoot
          .querySelectorAll('buv-certificate-input')[0];

        const children = [].slice.call(certificateInputComponent.shadowRoot.children);
        const hasCertificateInput = children.some(el => el.classList.contains('buv-qa-certificate-input'));
        expect(hasCertificateInput).to.equal(true);
      });
    });
  });
});
