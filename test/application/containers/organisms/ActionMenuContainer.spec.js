import { mapStateToProps } from '../../../../src/components/organisms/ActionMenu/ActionMenuContainer';
import getInitialState from '../../../../src/store/getInitialState';
import { configureStore } from '../../../../src/store';
import * as DISPLAY_MODE from '../../../../src/constants/displayMode';
import certificateFixture from '../../../fixtures/valid-certificate-example';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import stubCertificateVerify from '../../__helpers/stubCertificateVerify';

describe('ActionMenuContainer test suite', function () {
  describe('mapStateToProps method', function () {
    describe('given the API has the allowSocialShare property set', function () {
      it('should return its value', function () {
        const initialState = getInitialState({ allowSocialShare: true });
        const store = configureStore(initialState);
        const state = store.getState();

        expect(mapStateToProps(state).allowSocialShare).toBe(true);
      });
    });

    describe('given the API has the allowDownload property set', function () {
      it('should return its value', function () {
        const initialState = getInitialState({ allowDownload: true });
        const store = configureStore(initialState);
        const state = store.getState();

        expect(mapStateToProps(state).allowDownload).toBe(true);
      });
    });

    describe('given the API has the showMetadata property set', function () {
      it('should return its value', function () {
        const initialState = getInitialState({ showMetadata: true });
        const store = configureStore(initialState);
        const state = store.getState();

        expect(mapStateToProps(state).showMetadata).toBe(true);
      });
    });

    describe('given the display is in full mode', function () {
      describe('and there is a certificate definition in the state', function () {
        stubCertificateVerify(certificateFixture);

        it('should set the isVisible property to true', async function () {
          const initialState = getInitialState({ displayMode: DISPLAY_MODE.FULL, disableAutoVerify: true });
          const store = configureStore(initialState);
          await store.dispatch(updateCertificateDefinition(certificateFixture));
          const state = store.getState();

          expect(mapStateToProps(state).isVisible).toBe(true);
        });
      });
    });
  });
});
