import { getVerifiedSteps } from '../../../src/selectors/certificate';
import { configureStore } from '../../../src/store';
import updateCertificateDefinition from '../../../src/actions/updateCertificateDefinition';
import verifyCertificate from '../../../src/actions/verifyCertificate';
import invalidCertificateFixture from '../../fixtures/v2/invalid-certificate-example.json';
import invalidCertificateStepsAssertions from '../../assertions/invalidCertificateSteps';
import stubCertificateVerify from '../__helpers/stubCertificateVerify';

describe('verifyCertificate action creator test suite', function () {
  describe('given the verification has ended', function () {
    describe('and the verification was of a valid certificate', function () {
      stubCertificateVerify(invalidCertificateFixture, [], false);

      it('should store the different steps in the state', async function () {
        jest.useFakeTimers();
        const store = configureStore();
        store.dispatch(updateCertificateDefinition(invalidCertificateFixture) as any);
        await store.dispatch(verifyCertificate() as any);
        jest.runAllTimers();
        const state = store.getState();
        expect(getVerifiedSteps(state)).toEqual(invalidCertificateStepsAssertions);
        jest.useRealTimers();
      });
    });
  });
});
