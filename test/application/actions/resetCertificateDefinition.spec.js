import { configureStore } from '../../../src/store';
import { getCertificateDefinition, getVerifiedSteps } from '../../../src/selectors/certificate';
import resetCertificateDefinition from '../../../src/actions/resetCertificateDefinition';
import initialVerifiedStepsAssertion from '../../assertions/initialVerifiedSteps';
import validCertificateDefinition from '../../fixtures/valid-certificate-example';
import updateCertificateDefinition from '../../../src/actions/updateCertificateDefinition';
import getInitialState from '../../../src/store/getInitialState';

describe('resetCertificateDefinition action creator test suite', function () {
  let store;

  beforeEach(function () {
    const initialStateConfiguration = getInitialState({ disableAutoVerify: true });
    store = configureStore(initialStateConfiguration);
  });

  afterEach(function () {
    store = null;
  });

  it('should reset the previously verified steps', function () {
    const initialState = store.getState();
    // populate substep
    initialState.verifiedSteps[0].substeps.push({
      code: 'test',
      name: 'test'
    });

    store.dispatch(resetCertificateDefinition());

    const state = store.getState();

    expect(getVerifiedSteps(state)).toEqual(initialVerifiedStepsAssertion);
  });

  it('should reset the certificate definition to null', function () {
    // initially set a certificate definition in the state
    store.dispatch(updateCertificateDefinition(validCertificateDefinition));
    store.dispatch(resetCertificateDefinition());

    const state = store.getState();

    expect(getCertificateDefinition(state)).toBe(null);
  });
});
