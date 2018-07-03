import { configureStore } from '../../../src/store';
import verifyCertificate from '../../../src/actions/verifyCertificate';
import updateCertificateDefinition from '../../../src/actions/updateCertificateDefinition';
import { getVerifiedSteps } from '../../../src/selectors/certificate';
import validCertificateFixture from '../../fixtures/valid-certificate-example';
import invalidCertificateFixture from '../../fixtures/invalid-certificate-example';
import validCertificateStepsAssertions from '../../assertions/validCertificateSteps';
import invalidCertificateStepsAssertions from '../../assertions/invalidCertificateSteps';

describe('verifyCertificate action creator test suite', function () {
  describe('given the url inputted is valid', function () {
    describe('and the url is of a valid certificate', function () {
      it('should store the different steps in the state', async function () {
        const store = configureStore();
        // prepare state the correct way
        await store.dispatch(updateCertificateDefinition(validCertificateFixture));

        await store.dispatch(verifyCertificate());
        const state = store.getState();

        expect(getVerifiedSteps(state)).toEqual(validCertificateStepsAssertions);
      });
    });

    describe('and the url is of an invalid certificate', function () {
      it('should store the different steps in the state', async function () {
        const store = configureStore();
        // prepare state the correct way
        await store.dispatch(updateCertificateDefinition(invalidCertificateFixture));

        await store.dispatch(verifyCertificate());
        const state = store.getState();

        expect(getVerifiedSteps(state)).toEqual(invalidCertificateStepsAssertions);
      });
    });
  });

  describe('verifying a second certificate', function () {
    describe('given the certificates definitions valid definitions', function () {
      it('should only maintain the verifiedSteps of the latest certificate verified', async function () {
        const store = configureStore();
        store.dispatch(updateCertificateDefinition(validCertificateFixture));
        await store.dispatch(verifyCertificate());

        store.dispatch(updateCertificateDefinition(invalidCertificateFixture));
        await store.dispatch(verifyCertificate());
        const state = store.getState();

        expect(getVerifiedSteps(state)).toEqual(invalidCertificateStepsAssertions);
      });
    });
  });
});
