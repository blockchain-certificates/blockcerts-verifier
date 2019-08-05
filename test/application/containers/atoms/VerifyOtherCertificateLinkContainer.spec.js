import { configureStore } from '../../../../src/store';
import getInitialState from '../../../../src/store/getInitialState';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import certificateFixture from '../../../fixtures/valid-certificate-example';
import {
  mapDispatchToProps,
  mapStateToProps
} from '../../../../src/components/atoms/VerifyOtherCertificateLink/VerifyOtherCertificateLinkContainer';
import updateVerificationStatus from '../../../../src/actions/updateVerificationStatus';
import VERIFICATION_STATUS from '../../../../src/constants/verificationStatus';
import initialValidCertificateSteps from '../../../assertions/initialValidCertificateSteps';
import { getCertificateDefinition, getVerifiedSteps } from '../../../../src/selectors/certificate';
import { getVerificationStatus } from '../../../../src/selectors/verification';
import stepVerified from '../../../../src/actions/stepVerified';

jest.mock('../../../../src/helpers/stepQueue');

describe('VerifyOtherCertificateLinkContainer test suite', function () {
  let store;

  beforeEach(function () {
    const initialState = getInitialState({ disableAutoVerify: true });
    store = configureStore(initialState);
  });

  afterEach(function () {
    store = null;
  });

  describe('mapStateToProps function', function () {
    describe('given there is a certificate definition in the state', function () {
      it('should set the isVisible property to true', function () {
        store.dispatch(updateCertificateDefinition(certificateFixture));
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
        beforeEach(function () {
          store.dispatch(updateCertificateDefinition(certificateFixture));
          store.dispatch(updateVerificationStatus(VERIFICATION_STATUS.SUCCESS));
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
      });
    });
  });
});
