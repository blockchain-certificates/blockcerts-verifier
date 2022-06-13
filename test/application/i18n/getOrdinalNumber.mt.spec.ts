import getOrdinalNumber from '../../../src/i18n/getOrdinalNumber';
import currentLocale from '../../../src/i18n/valueObjects/currentLocale';

// language is not officially enabled, see `getSupportedLanguages` file. Translation is also incomplete
xdescribe('i18n getOrdinalNumber test suite', function () {
  beforeEach(function () {
    currentLocale.locale = 'mt';
  });

  afterEach(function () {
    currentLocale.locale = 'en';
  });

  it('should be correct for 1st', function () {
    expect(getOrdinalNumber(1)).toBe('l-ewwel');
  });

  it('should be correct for 2nd', function () {
    expect(getOrdinalNumber(2)).toBe('it-tieni');
  });

  it('should be correct for 3rd', function () {
    expect(getOrdinalNumber(3)).toBe('it-tielet');
  });

  it('should be correct for 4th', function () {
    expect(getOrdinalNumber(4)).toBe('ir-raba\'');
  });

  it('should be correct for 5th', function () {
    expect(getOrdinalNumber(5)).toBe('il-ħames');
  });

  it('should be correct for 6th', function () {
    expect(getOrdinalNumber(6)).toBe('is-sitt');
  });

  it('should be correct for 7th', function () {
    expect(getOrdinalNumber(7)).toBe('is-seba\'');
  });

  it('should be correct for 8th', function () {
    expect(getOrdinalNumber(8)).toBe('it-tmien');
  });

  it('should be correct for 9th', function () {
    expect(getOrdinalNumber(9)).toBe('id-disa\'');
  });
});
