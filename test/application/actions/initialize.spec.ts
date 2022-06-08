import { configureStore } from '../../../src/store';
import initialize from '../../../src/actions/initialize';
import { getCertificateUrl } from '../../../src/selectors/input';
import currentLocale from '../../../src/i18n/valueObjects/currentLocale';
import { CertificateOptions } from '@blockcerts/cert-verifier-js';
import { getExplorerAPIs } from '../../../src/selectors/api';
import { getCertificateDefinition } from '../../../src/selectors/certificate';
import { wait } from '../../e2e/helpers/waitForKarma';
import validCertificateFixture from '../../fixtures/v2/valid-certificate-example.json';
import validCertificateAssertion from '../../assertions/validCertificate';

describe('initialize action creator test suite', function () {
  let store;

  beforeEach(function () {
    store = configureStore();
  });

  afterEach(function () {
    store = null;
  });

  describe('given it is called with a src option', function () {
    describe('and the src is a URL', function () {
      it('should update the certificate URL with the value', function () {
        const fixtureURL = 'https://www.test.com';
        const options = {
          src: fixtureURL
        };

        store.dispatch(initialize(options));
        const state = store.getState();
        expect(getCertificateUrl(state)).toBe(fixtureURL);
      });
    });

    describe('and the src is a JSON string of a Blockcerts', function () {
      it('should update the certificate definition with the value', async function () {
        const options = {
          src: JSON.stringify(validCertificateFixture)
        };

        await store.dispatch(initialize(options));
        // since we don't await for the resolution of the dispatch of certificate definition update we need to
        // wait for the update to take place.
        await wait(1000);
        const state = store.getState();
        expect(getCertificateDefinition(state).id).toBe(validCertificateAssertion.id);
      });
    });
  });

  describe('locale option', function () {
    beforeEach(function () {
      (navigator as any).__defineGetter__('language', function () {
        return 'fr-FR';
      });
    });

    afterEach(function () {
      (navigator as any).__defineGetter__('language', function () {
        return 'es-ES';
      });
    });

    describe('given it is empty', function () {
      it('should detect the current locale', function () {
        store.dispatch(initialize({}));
        expect(currentLocale.locale).toBe('fr');
      });
    });

    describe('given it is auto', function () {
      it('should detect the current locale', function () {
        store.dispatch(initialize({ locale: 'auto' }));
        expect(currentLocale.locale).toBe('fr');
      });
    });

    describe('given it is set to a supported locale', function () {
      it('should use the set locale', function () {
        store.dispatch(initialize({ locale: 'fr' }));
        expect(currentLocale.locale).toBe('fr');
      });
    });

    describe('given it is set to an unsupported locale', function () {
      it('should use the default locale', function () {
        store.dispatch(initialize({ locale: 'unsupported' }));
        expect(currentLocale.locale).toBe('en');
      });
    });
  });

  describe('given it is called with the explorerAPIs option', function () {
    it('should maintain it in the state', function () {
      const fixtureOptions: CertificateOptions = {
        explorerAPIs: [{
          priority: 0,
          parsingFunction: (): any => {},
          serviceURL: 'test.com'
        }]
      };
      store.dispatch(initialize(fixtureOptions));
      const state = store.getState();
      expect(getExplorerAPIs(state)).toEqual(fixtureOptions.explorerAPIs);
    });
  });
});
