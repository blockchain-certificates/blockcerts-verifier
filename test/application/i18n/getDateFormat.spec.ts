import currentLocale from '../../../src/i18n/valueObjects/currentLocale';
import getDateFormat from '../../../src/i18n/getDateFormat';

class MockDate {
  private readonly date: string;

  constructor (date) {
    this.date = date;
  }

  getMonth (): number {
    return parseInt(this.date.split('-')[1], 10) - 1;
  }

  getDate (): number {
    return parseInt(this.date.split('-')[2], 10);
  }

  getFullYear (): number {
    return parseInt(this.date.split('-')[0], 10);
  }
}

describe('getDateFormat test suite', function () {
  describe('given a date', function () {
    let initialDate;
    beforeEach(function () {
      initialDate = global.Date;
      global.Date = MockDate as any;
    });

    afterEach(function () {
      global.Date = initialDate;
    });

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
