import getOrdinalNumber from '../../../src/i18n/getOrdinalNumber';

describe('i18n getOrdinalNumber test suite', function () {
  it('should be correct for 1st', function () {
    expect(getOrdinalNumber(1)).toBe('1st');
  });

  it('should be correct for 2nd', function () {
    expect(getOrdinalNumber(2)).toBe('2nd');
  });

  it('should be correct for 3rd', function () {
    expect(getOrdinalNumber(3)).toBe('3rd');
  });

  it('should be correct for 4th', function () {
    expect(getOrdinalNumber(4)).toBe('4th');
  });

  it('should be correct for 11th', function () {
    expect(getOrdinalNumber(11)).toBe('11th');
  });

  it('should be correct for 21st', function () {
    expect(getOrdinalNumber(21)).toBe('21st');
  });

  it('should be correct for 22nd', function () {
    expect(getOrdinalNumber(22)).toBe('22nd');
  });

  it('should be correct for 23rd', function () {
    expect(getOrdinalNumber(23)).toBe('23rd');
  });

  it('should be correct for 101st', function () {
    expect(getOrdinalNumber(101)).toBe('101st');
  });
});
