import toBase64 from '../../../src/helpers/base64';

describe('toBase64 function', function () {
  it('should return the base64 encoded string', function () {
    expect(toBase64('mock-text-content')).toBe('bW9jay10ZXh0LWNvbnRlbnQ=');
  });
});
