import * as CERTIFICATE_EVENTS from '../../../src/constants/certificateEvents';
import updateCertificateDefinition from '../../../src/actions/updateCertificateDefinition';
import certificateFixture from '../../fixtures/valid-certificate-example';
import { configureStore } from '../../../src/store';
import getInitialState from '../../../src/store/getInitialState';
import shareSocialNetwork from '../../../src/actions/shareSocialNetwork';

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
        expect(e.detail.uid).toBe('https://auto-certificates.learningmachine.io/certificate/54ae740e31aa571a8c718fa84924da97');
      }
      window.addEventListener(CERTIFICATE_EVENTS.CERTIFICATE_SHARE, assertFunction);

      store.dispatch(updateCertificateDefinition(certificateFixture));
      store.dispatch(shareSocialNetwork());

      // add failsafe, if no expect is called test is false positive
      expect(wasCalled).toBe(true);
      // only expect once
      window.removeEventListener(CERTIFICATE_EVENTS.CERTIFICATE_SHARE, assertFunction);
    });
  });
});
