import BlockcertsLogo from '../../../../src/components/atoms/BlockcertsLogo/BlockcertsLogo';

describe('BlockcertsLogo test suite', function () {
  describe('given the className is passed', function () {
    it('should set the className', function () {
      const instance = BlockcertsLogo({ className: 'buv-qa-test' });
      expect(instance.values).toContain('buv-qa-test');
    });
  });

  describe('given the logoSize is not passed', function () {
    it('should set the class as small by default', function () {
      const instance = BlockcertsLogo();
      expect(instance.values).toContain('buv-c-logo--small');
    });
  });

  describe('given the logoSize is passed', function () {
    it('should set the class as specified', function () {
      const instance = BlockcertsLogo({ logoSize: 'medium' });
      expect(instance.values).toContain('buv-c-logo--medium');
    });
  });

  describe('given the showMotto is passed as true', function () {
    it('should show the motto', function () {
      const instance = BlockcertsLogo({ showMotto: true });
      expect(instance.values).toContain('buv-c-logo__motto');
    });
  });

  describe('given the showMotto is passed as false', function () {
    it('should not show the motto', function () {
      const instance = BlockcertsLogo({ showMotto: false });
      expect(instance.values).toContain('buv-u-visually-hidden');
    });
  });
});
