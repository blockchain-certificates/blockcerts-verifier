import currentLocale from '../../../src/i18n/valueObjects/currentLocale';
import getDateFormat from '../../../src/i18n/getDateFormat';

describe('getDateFormat test suite', function () {
  describe('given a date', function () {
    describe('and the current language is English', function () {
      it('should return the correct format', function () {
        currentLocale.locale = 'en';
        const fixtureDate = '2019-01-01';
        const expectedDate = 'Jan 1, 2019';
        expect(getDateFormat(fixtureDate)).toBe(expectedDate);
      });
    });

    describe('and the current language is French', function () {
      it('should return the correct format', function () {
        currentLocale.locale = 'fr';
        const fixtureDate = '2019-01-01';
        const expectedDate = '1 Jan 2019';
        expect(getDateFormat(fixtureDate)).toBe(expectedDate);
      });
    });
  });
});
