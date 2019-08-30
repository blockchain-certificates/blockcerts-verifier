import { configureStore } from '../../../src/store';
import initialize from '../../../src/actions/initialize';
import { getCertificateUrl } from '../../../src/selectors/input';
import currentLocale from '../../../src/i18n/valueObjects/currentLocale';

describe('initialize action creator test suite', function () {
  describe('given it is called with a src option', function () {
    it('should update the certificate URL with the value', function () {
      const fixtureURL = 'https://www.test.com';
      const options = {
        src: fixtureURL
      };

      const store = configureStore();
      store.dispatch(initialize(options));
      const state = store.getState();
      expect(getCertificateUrl(state)).toBe(fixtureURL);
    });
  });

  describe('locale option', function () {
    beforeEach(function () {
      navigator.__defineGetter__('language', function () {
        return 'fr-FR';
      });
    });

    afterEach(function () {
      navigator.__defineGetter__('language', function () {
        return 'es-ES';
      });
    });

    describe('given it is empty', function () {
      it('should detect the current locale', function () {
        const store = configureStore();
        store.dispatch(initialize({}));
        expect(currentLocale.locale).toBe('fr');
      });
    });

    describe('given it is auto', function () {
      it('should detect the current locale', function () {
        const store = configureStore();
        store.dispatch(initialize({ locale: 'auto' }));
        expect(currentLocale.locale).toBe('fr');
      });
    });

    describe('given it is set to a supported locale', function () {
      it('should use the set locale', function () {
        const store = configureStore();
        store.dispatch(initialize({ locale: 'fr' }));
        expect(currentLocale.locale).toBe('fr');
      });
    });

    describe('given it is set to an unsupported locale', function () {
      it('should use the default locale', function () {
        const store = configureStore();
        store.dispatch(initialize({ locale: 'unsupported' }));
        expect(currentLocale.locale).toBe('en');
      });
    });
  });
});
