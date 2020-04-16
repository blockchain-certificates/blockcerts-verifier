import { configureStore } from '../../../../src/store';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import certificateFixture from '../../../fixtures/valid-certificate-example';
import {
  mapDispatchToProps,
  mapStateToProps
} from '../../../../src/components/atoms/VerifyOtherCertificateLink/VerifyOtherCertificateLinkContainer';
import VERIFICATION_STATUS from '../../../../src/constants/verificationStatus';
import initialValidCertificateSteps from '../../../assertions/initialValidCertificateSteps';
import { getCertificateDefinition, getFinalStep, getVerifiedSteps } from '../../../../src/selectors/certificate';
import { getVerificationStatus } from '../../../../src/selectors/verification';
import stepVerified from '../../../../src/actions/stepVerified';
import stubCertificateVerify from '../../__helpers/stubCertificateVerify';

jest.mock('../../../../src/helpers/stepQueue');

describe('VerifyOtherCertificateLinkContainer test suite', function () {
  let store;

  beforeEach(function () {
    store = configureStore();
  });

  afterEach(function () {
    store = null;
  });

  describe('mapStateToProps function', function () {
    stubCertificateVerify(certificateFixture);

    describe('given there is a certificate definition in the state', function () {
      it('should set the isVisible property to true', async function () {
        await store.dispatch(updateCertificateDefinition(certificateFixture));
        const state = store.getState();
        expect(mapStateToProps(state).isVisible).toBe(true);
      });
    });

    describe('given there is no certificate definition in the state', function () {
      it('should set the isVisible property to false', function () {
        const state = store.getState();
        expect(mapStateToProps(state).isVisible).toBe(false);
      });
    });
  });

  describe('mapDispatchToProps object', function () {
    describe('onClick method', function () {
      describe('when called', function () {
        stubCertificateVerify(certificateFixture);

        beforeEach(async function () {
          await store.dispatch(updateCertificateDefinition(certificateFixture));
          store.dispatch(stepVerified({
            code: 'getTransactionId',
            label: 'Getting transaction ID',
            status: 'success'
          }));
          store.dispatch(mapDispatchToProps.onClick());
        });

        it('should reset the certificate definition', function () {
          const state = store.getState();
          expect(getCertificateDefinition(state)).toBe(null);
        });

        it('should reset the verification status', function () {
          const state = store.getState();
          expect(getVerificationStatus(state)).toBe(VERIFICATION_STATUS.DEFAULT);
        });

        it('should reset the verified steps', function () {
          const state = store.getState();
          expect(getVerifiedSteps(state)).toEqual(initialValidCertificateSteps);
        });

        it('should reset the final step', function () {
          const state = store.getState();
          expect(getFinalStep(state)).toBe(null);
        });
      });
    });
  });
});
