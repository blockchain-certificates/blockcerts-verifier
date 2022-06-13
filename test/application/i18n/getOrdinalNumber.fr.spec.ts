import getOrdinalNumber from '../../../src/i18n/getOrdinalNumber';
import currentLocale from '../../../src/i18n/valueObjects/currentLocale';

describe('i18n getOrdinalNumber test suite', function () {
  beforeEach(function () {
    currentLocale.locale = 'fr';
  });

  afterEach(function () {
    currentLocale.locale = 'en';
  });

  it('should be correct for 1er', function () {
    expect(getOrdinalNumber(1)).toBe('1er');
  });

  it('should be correct for 2ème', function () {
    expect(getOrdinalNumber(2)).toBe('2ème');
  });

  it('should be correct for 11ème', function () {
    expect(getOrdinalNumber(11)).toBe('11ème');
  });

  it('should be correct for 21ème', function () {
    expect(getOrdinalNumber(21)).toBe('21ème');
  });

  it('should be correct for 101ème', function () {
    expect(getOrdinalNumber(101)).toBe('101ème');
  });
});
