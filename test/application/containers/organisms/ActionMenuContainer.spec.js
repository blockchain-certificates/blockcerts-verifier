import { mapStateToProps } from '../../../../src/components/organisms/ActionMenu/ActionMenuContainer';
import getInitialState from '../../../../src/store/getInitialState';
import { configureStore } from '../../../../src/store';

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
  });
});

