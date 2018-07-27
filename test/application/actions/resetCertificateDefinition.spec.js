import { configureStore } from '../../../src/store';
import { getCertificateDefinition, getVerifiedSteps } from '../../../src/selectors/certificate';
import resetCertificateDefinition from '../../../src/actions/resetCertificateDefinition';
import validCertificateFixture from '../../fixtures/valid-certificate-example';
import validCertificateAssertion from '../../assertions/validCertificate';

import updateCertificateDefinition from '../../../src/actions/updateCertificateDefinition';
import getInitialState from '../../../src/store/getInitialState';

describe('resetCertificateDefinition action creator test suite', function () {
  let store;

  beforeEach(function () {
    const initialStateConfiguration = getInitialState({ disableAutoVerify: true });
    store = configureStore(initialStateConfiguration);
    // initially set a certificate definition in the state
    store.dispatch(updateCertificateDefinition(validCertificateFixture));
  });

  afterEach(function () {
    store = null;
  });

  it('should reset the previously verified steps', function () {
    store.dispatch(resetCertificateDefinition());
    const state = store.getState();

    expect(getVerifiedSteps(state)).toEqual(validCertificateAssertion.verificationSteps);
  });

  it('should reset the certificate definition to null', function () {
    store.dispatch(resetCertificateDefinition());
    const state = store.getState();

    expect(getCertificateDefinition(state)).toBe(null);
  });
});
