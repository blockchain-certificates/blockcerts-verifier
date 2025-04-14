import { describe, expect, it, vi } from 'vitest';
import { getVerifiedSteps } from '../../../src/selectors/certificate';
import { configureStore } from '../../../src/store';
import updateCertificateDefinition from '../../../src/actions/updateCertificateDefinition';
import verifyCertificate from '../../../src/actions/verifyCertificate';
import validCertificateFixture from '../../fixtures/v2/valid-certificate-example.json';
import validCertificateStepsAssertions from '../../assertions/validCertificateSteps';
import stubCertificateVerify from '../__helpers/stubCertificateVerify';

describe('verifyCertificate action creator test suite', function () {
  describe('given the verification has ended', function () {
    describe('and the verification was of a valid certificate', function () {
      stubCertificateVerify(validCertificateFixture);

      it('should store the different steps in the state', async function () {
        vi.useFakeTimers();
        const store = configureStore();
        store.dispatch(updateCertificateDefinition(validCertificateFixture) as any);
        await store.dispatch(verifyCertificate() as any);
        vi.runAllTimers();
        const state = store.getState();
        expect(getVerifiedSteps(state)).toEqual(validCertificateStepsAssertions);
        vi.useRealTimers();
      });
    });
  });
});
