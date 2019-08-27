import detectLocale from '../../../src/i18n/detectLocale';

describe('domain i18n detectLocale use case test suite', function () {
  describe('given it detected the navigator locale', function () {
    it('should return the detected locale', function () {
      navigator.__defineGetter__('language', function () {
        return 'fr-FR';
      });
      const locale = detectLocale();
      expect(locale).toBe('fr-FR');
    });
  });

  describe('given it did not get the navigator language property', function () {
    it('should return the navigator userLanguage', function () {
      navigator.__defineGetter__('language', function () {
        return null;
      });
      navigator.__defineGetter__('userLanguage', function () {
        return 'fr-FR';
      });
      const locale = detectLocale();
      expect(locale).toBe('fr-FR');
    });
  });

  describe('given it did not get the navigator language or userLanguage property', function () {
    it('should return the navigator userLanguage', function () {
      navigator.__defineGetter__('language', function () {
        return null;
      });
      navigator.__defineGetter__('userLanguage', function () {
        return null;
      });
      navigator.__defineGetter__('browserLanguage', function () {
        return 'fr-FR';
      });

      const locale = detectLocale();
      expect(locale).toBe('fr-FR');
    });
  });

  describe('given it did not get any navigator properties', function () {
    it('should return default locale', function () {
      navigator.__defineGetter__('language', function () {
        return null;
      });
      navigator.__defineGetter__('userLanguage', function () {
        return null;
      });
      navigator.__defineGetter__('browserLanguage', function () {
        return null;
      });

      const locale = detectLocale();
      expect(locale).toBe('en');
    });
  });
});
