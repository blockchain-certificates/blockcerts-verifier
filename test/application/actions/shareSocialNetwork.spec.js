import * as CERTIFICATE_EVENTS from '../../../src/constants/certificateEvents';
import updateCertificateDefinition from '../../../src/actions/updateCertificateDefinition';
import certificateFixture from '../../fixtures/valid-certificate-example';
import { configureStore } from '../../../src/store';
import shareSocialNetwork from '../../../src/actions/shareSocialNetwork';
import validCertificate from '../../assertions/validCertificate';
import stubCertificateVerify from '../__helpers/stubCertificateVerify';

describe('shareSocialNetwork action creator test suite', function () {
  describe('given it is dispatched', function () {
    stubCertificateVerify(certificateFixture);
    let store;

    beforeEach(function () {
      store = configureStore();
    });

    afterEach(function () {
      store = null;
    });

    it('should emit the certificate-share event with the certificate id', async function () {
      let wasCalled = false;
      function assertFunction (e) {
        wasCalled = true;
        expect(e.detail.certificateDefinition.id).toEqual(validCertificate.id);
      }
      window.addEventListener(CERTIFICATE_EVENTS.CERTIFICATE_SHARE, assertFunction);

      await store.dispatch(updateCertificateDefinition(certificateFixture));
      store.dispatch(shareSocialNetwork());

      // add failsafe, if no expect is called test is false positive
      expect(wasCalled).toBe(true);
      // only expect once
      window.removeEventListener(CERTIFICATE_EVENTS.CERTIFICATE_SHARE, assertFunction);
    });

    it('should emit the certificate-share event with the network on which it was shared', async function () {
      let wasCalled = false;
      const testSocialNetwork = 'MySpace';
      function assertFunction (e) {
        wasCalled = true;
        expect(e.detail.socialNetwork).toBe(testSocialNetwork);
      }
      window.addEventListener(CERTIFICATE_EVENTS.CERTIFICATE_SHARE, assertFunction);

      await store.dispatch(updateCertificateDefinition(certificateFixture));
      store.dispatch(shareSocialNetwork(testSocialNetwork));

      // add failsafe, if no expect is called test is false positive
      expect(wasCalled).toBe(true);
      // only expect once
      window.removeEventListener(CERTIFICATE_EVENTS.CERTIFICATE_SHARE, assertFunction);
    });
  });
});
