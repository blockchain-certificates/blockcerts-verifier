import domain from '../../../../../src/domain';
import supportedI18n from '../../../../../src/i18n';

describe('domain i18n getSupportedLanguages use case test suite', () => {
  const assertionSupportedLanguages = Object.keys(supportedI18n);

  it('should return an array of supported languages', () => {
    const res = domain.i18n.getSupportedLanguages();
    expect(res).toEqual(assertionSupportedLanguages);
  });
});
