import BlockcertsLogo from '../../../../src/components/atoms/BlockcertsLogo/BlockcertsLogo';

function assertClass (instance, className) {
  return instance.values.some(value => value.values.indexOf(className));
}

describe('BlockcertsLogo test suite', function () {
  describe('given the className is passed', function () {
    it('should set the className', function () {
      const instance = BlockcertsLogo({ className: 'buv-qa-test' });
      expect(instance.values).toContain('buv-qa-test');
    });
  });

  describe('given the showMotto is falsy', function () {
    it('should use the simple logo', function () {
      const instance = BlockcertsLogo();
      expect(assertClass(instance, 'buv-qa-logo--simple')).toBe(true);
    });

    it('should set the class as small', function () {
      const instance = BlockcertsLogo();
      expect(assertClass(instance, 'buv-c-logo--small')).toBe(true);
    });
  });

  describe('given the showMotto is passed as true', function () {
    it('should use the branded logo', function () {
      const instance = BlockcertsLogo();
      expect(assertClass(instance, 'buv-qa-logo--branded')).toBe(true);
    });

    it('should set the class as medium', function () {
      const instance = BlockcertsLogo();
      expect(assertClass(instance, 'buv-c-logo--medium')).toBe(true);
    });
  });
});
