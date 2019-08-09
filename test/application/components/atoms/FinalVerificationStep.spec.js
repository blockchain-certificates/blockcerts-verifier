import FinalVerificationStep from '../../../../src/components/atoms/FinalVerificationStep/FinalVerificationStep';
import { assertClassInStringBits, assertStringInValues } from '../helpers/assertClass';

describe('FinalVerificationStep component test suite', function () {
  describe('given the isVisible flag is set to true', function () {
    it('should add the is-visible class', function () {
      const instance = FinalVerificationStep({ isVisible: true, finalStep: {} });
      expect(assertClassInStringBits(instance, 'is-visible')).toBe(true);
    });
  });

  describe('given the isVisible flag is set to false', function () {
    it('should not add the is-visible class', function () {
      const instance = FinalVerificationStep({ isVisible: false, finalStep: {} });
      expect(assertClassInStringBits(instance, 'is-visible')).toBe(false);
    });
  });

  describe('given the isTestChain flag is set to true', function () {
    it('should add the is-test class', function () {
      const instance = FinalVerificationStep({ isTestChain: true, finalStep: {} });
      expect(assertClassInStringBits(instance, 'is-test')).toBe(true);
    });
  });

  describe('given the isTestChain flag is set to false', function () {
    it('should not add the is-test class', function () {
      const instance = FinalVerificationStep({ isTestChain: false, finalStep: {} });
      expect(assertClassInStringBits(instance, 'is-test')).toBe(false);
    });
  });

  describe('given the chain is provided', function () {
    it('should replace the chain in the text', function () {
      const fixtureFinalStep = {
        // eslint-disable-next-line no-template-curly-in-string
        description: 'here we test ${chain}'
      };

      const instance = FinalVerificationStep({ chain: 'Bitcoin', finalStep: fixtureFinalStep });
      expect(assertStringInValues(instance, 'here we test Bitcoin')).toBe(true);
    });
  });

  describe('given there is a link text', function () {
    it('should use the transaction link', function () {
      const fixtureFinalStep = {
        linkText: 'Check transaction'
      };

      const instance = FinalVerificationStep({ transactionLink: 'http://test.com', finalStep: fixtureFinalStep });
      expect(assertStringInValues(instance, 'http://test.com')).toBe(true);
    });

    it('should use the linkText', function () {
      const fixtureFinalStep = {
        linkText: 'Check transaction'
      };

      const instance = FinalVerificationStep({ transactionLink: 'http://test.com', finalStep: fixtureFinalStep });
      expect(assertStringInValues(instance, 'Check transaction')).toBe(true);
    });
  });
});
