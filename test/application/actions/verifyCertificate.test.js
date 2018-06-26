import { configureStore } from '../../../src/store';
import verifyCertificate from '../../../src/actions/verifyCertificate';
import updateCertificateUrl from '../../../src/actions/updateCertificateUrl';
import { getUrlIsValid } from '../../../src/selectors/input';
import { getJSONCertificate, getVerifiedSteps } from '../../../src/selectors/certificate';
import certificateFixture from '../../fixtures/certificate-example';
import validCertificateStepsAssertions from '../../assertions/validCertificateSteps';

const INVALID_URL = 'invalid url';
const MOCK_SERVER_VALID_URL = 'http://localhost:3001/to/certificate';
const NOT_CERTIFICATE_URL = 'http://www.learningmachine.com';

describe('verifyCertificate action creator test suite', function () {
  describe('given the url inputted is invalid', function () {
    let store;

    beforeEach(function () {
      store = configureStore();
      // prepare state the correct way
      store.dispatch(updateCertificateUrl(INVALID_URL));
    });

    afterEach(function () {
      store = null;
    });

    it('should update the state input isValid property to false', function () {
      store.dispatch(verifyCertificate());

      const state = store.getState();

      expect(getUrlIsValid(state)).toBe(false);
    });

    it('should do nothing', async function () {
      const output = await store.dispatch(verifyCertificate());
      expect(output).toBe(null);
    });
  });

  describe('given the url inputted is valid', function () {
    describe('and the url is of a certificate', function () {
      let store;

      beforeEach(function () {
        store = configureStore();
        // prepare state the correct way
        store.dispatch(updateCertificateUrl(MOCK_SERVER_VALID_URL));
      });

      afterEach(function () {
        store = null;
      });

      it('should set the certificate json in the state', async function () {
        await store.dispatch(verifyCertificate());
        const state = store.getState();

        expect(getJSONCertificate(state)).toEqual(certificateFixture);
      });

      it('should store the different steps in the state', async function () {
        await store.dispatch(verifyCertificate());
        const state = store.getState();

        expect(getVerifiedSteps(state)).toEqual(validCertificateStepsAssertions);
      })
    });

    describe('and the url is not of a certificate', function () {
      let store;

      beforeEach(function () {
        store = configureStore();
        // prepare state the correct way
        store.dispatch(updateCertificateUrl(NOT_CERTIFICATE_URL));
      });

      afterEach(function () {
        store = null;
      });

      it('should not set the certificate json in the state', async function () {
        await store.dispatch(verifyCertificate());
        const state = store.getState();

        expect(getJSONCertificate(state)).toEqual(undefined);
      });
    });
  });
});
