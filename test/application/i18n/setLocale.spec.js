import currentLocale from '../../../src/i18n/valueObjects/currentLocale';
import setLocale from '../../../src/i18n/setLocale';
import { defaultLocale } from '../../../src/i18n/detectLocale';

describe('setLocale test suite', function () {
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

  describe('given it is called with an falsy value', function () {
    it('should detect the current locale', function () {
      setLocale();
      expect(currentLocale.locale).toBe('fr');
    });
  });

  describe('given it is called with "auto"', function () {
    it('should detect the current locale', function () {
      setLocale('auto');
      expect(currentLocale.locale).toBe('fr');
    });

    describe('and the navigator locale is not supported', function () {
      it('should use the default locale', function () {
        navigator.__defineGetter__('language', function () {
          return 'unsupported';
        });
        setLocale('auto');
        expect(currentLocale.locale).toBe('en');
      });
    });
  });

  describe('given it is set to a supported locale', function () {
    it('should use the set locale', function () {
      setLocale('fr');
      expect(currentLocale.locale).toBe('fr');
    });
  });

  describe('given it is set to an unsupported locale', function () {
    it('should use the default locale', function () {
      setLocale('unsupported');
      expect(currentLocale.locale).toBe(defaultLocale);
    });
  });
});
