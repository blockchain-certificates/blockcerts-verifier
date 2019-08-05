import { configureStore } from '../../../src/store';
import { getCertificateDefinition, getVerifiedSteps } from '../../../src/selectors/certificate';
import resetCertificateDefinition from '../../../src/actions/resetCertificateDefinition';
import updateCertificateDefinition from '../../../src/actions/updateCertificateDefinition';
import getInitialState from '../../../src/store/getInitialState';
import validCertificateFixture from '../../fixtures/valid-certificate-example';
import initialValidCertificateSteps from '../../assertions/initialValidCertificateSteps';
import { getVerificationStatus } from '../../../src/selectors/verification';
import VERIFICATION_STATUS from '../../../src/constants/verificationStatus';
import updateVerificationStatus from '../../../src/actions/updateVerificationStatus';
import stepVerified from '../../../src/actions/stepVerified';

jest.mock('../../../src/helpers/stepQueue');

describe('resetCertificateDefinition action creator test suite', function () {
  let store;

  beforeEach(function () {
    const initialStateConfiguration = getInitialState({ disableAutoVerify: true });
    store = configureStore(initialStateConfiguration);
    // initially set a certificate definition in the state
    store.dispatch(updateCertificateDefinition(validCertificateFixture));
    store.dispatch(updateVerificationStatus(VERIFICATION_STATUS.SUCCESS));
    store.dispatch(stepVerified({
      code: 'getTransactionId',
      label: 'Getting transaction ID',
      status: 'success'
    }));
  });

  afterEach(function () {
    store = null;
  });

  it('should reset the previously verified steps', function () {
    store.dispatch(resetCertificateDefinition());
    const state = store.getState();

    expect(getVerifiedSteps(state)).toEqual(initialValidCertificateSteps);
  });

  it('should reset the certificate definition to null', function () {
    store.dispatch(resetCertificateDefinition());
    const state = store.getState();

    expect(getCertificateDefinition(state)).toBe(null);
  });

  it('should reset the verification status to DEFAULT', function () {
    store.dispatch(resetCertificateDefinition());
    const state = store.getState();

    expect(getVerificationStatus(state)).toBe(VERIFICATION_STATUS.DEFAULT);
  });
});
