import getOrdinalNumber from '../../../src/i18n/getOrdinalNumber';
import currentLocale from '../../../src/i18n/valueObjects/currentLocale';

describe('i18n getOrdinalNumber test suite', function () {
  beforeEach(function () {
    currentLocale.locale = 'es';
  });

  afterEach(function () {
    currentLocale.locale = 'en';
  });

  it('should be correct for 1°', function () {
    expect(getOrdinalNumber(1)).toBe('1°');
  });

  it('should be correct for 2°', function () {
    expect(getOrdinalNumber(2)).toBe('2°');
  });
});
