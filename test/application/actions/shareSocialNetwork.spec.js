import * as CERTIFICATE_EVENTS from '../../../src/constants/certificateEvents';
import updateCertificateDefinition from '../../../src/actions/updateCertificateDefinition';
import certificateFixture from '../../fixtures/valid-certificate-example';
import { configureStore } from '../../../src/store';
import getInitialState from '../../../src/store/getInitialState';
import shareSocialNetwork from '../../../src/actions/shareSocialNetwork';
import validCertificate from '../../assertions/validCertificate';

describe('shareSocialNetwork action creator test suite', function () {
  describe('given it is dispatched', function () {
    let store;

    beforeEach(function () {
      const apiConfiguration = {
        disableAutoVerify: true
      };
      const initialState = getInitialState(apiConfiguration);
      store = configureStore(initialState);
    });

    afterEach(function () {
      store = null;
    });

    it('should emit the certificate-share event with the certificate id', function () {
      let wasCalled = false;
      function assertFunction (e) {
        wasCalled = true;
        expect(e.detail.certificateDefinition.transactionId).toEqual(validCertificate.transactionId);
      }
      window.addEventListener(CERTIFICATE_EVENTS.CERTIFICATE_SHARE, assertFunction);

      store.dispatch(updateCertificateDefinition(certificateFixture));
      store.dispatch(shareSocialNetwork());

      // add failsafe, if no expect is called test is false positive
      expect(wasCalled).toBe(true);
      // only expect once
      window.removeEventListener(CERTIFICATE_EVENTS.CERTIFICATE_SHARE, assertFunction);
    });

    it('should emit the certificate-share event with the network on which it was shared', function () {
      let wasCalled = false;
      const testSocialNetwork = 'MySpace';
      function assertFunction (e) {
        wasCalled = true;
        expect(e.detail.socialNetwork).toBe(testSocialNetwork);
      }
      window.addEventListener(CERTIFICATE_EVENTS.CERTIFICATE_SHARE, assertFunction);

      store.dispatch(updateCertificateDefinition(certificateFixture));
      store.dispatch(shareSocialNetwork(testSocialNetwork));

      // add failsafe, if no expect is called test is false positive
      expect(wasCalled).toBe(true);
      // only expect once
      window.removeEventListener(CERTIFICATE_EVENTS.CERTIFICATE_SHARE, assertFunction);
    });
  });
});
