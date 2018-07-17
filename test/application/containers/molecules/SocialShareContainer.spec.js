import getInitialState from '../../../../src/store/getInitialState';
import { configureStore } from '../../../../src/store/index';
import { mapStateToProps } from '../../../../src/components/molecules/SocialShare/SocialShareContainer';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import certificateFixture from '../../../fixtures/valid-certificate-example';

describe('SocialShareContainer test suite', function () {
  describe('mapStateToProps method', function () {
    describe('given the API has the allowSocialShare property set', function () {
      it('should return its value', function () {
        const initialState = getInitialState({ allowSocialShare: true });
        const store = configureStore(initialState);
        const state = store.getState();

        expect(mapStateToProps(state).allowSocialShare).toBe(true);
      });
    });

    describe('given there is a certificate definition set in the state', function () {
      it('should return its value', async function () {
        const initialState = getInitialState({ disableAutoVerify: true });
        const store = configureStore(initialState);

        await store.dispatch(updateCertificateDefinition(certificateFixture));

        const state = store.getState();
        const expectedOutput = 'https://auto-certificates.learningmachine.io/certificate/54ae740e31aa571a8c718fa84924da97';

        expect(mapStateToProps(state).url).toBe(expectedOutput);
      });
    });
  });
});
