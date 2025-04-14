import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import FinalVerificationStep from '../../../../src/components/atoms/FinalVerificationStep/FinalVerificationStep';
import { assertClassInStringBits, assertStringInValues } from '../helpers/assertStringValues';
import type { IFinalStep } from '../../../../src/store/getInitialState';

describe('FinalVerificationStep component test suite', function () {
  describe('given the isVisible flag is set to true', function () {
    it('should add the is-visible class', function () {
      const instance = FinalVerificationStep({ isVisible: true, finalStep: {} as any });
      expect(assertClassInStringBits(instance, 'is-visible')).toBe(true);
    });
  });

  describe('given the isVisible flag is set to false', function () {
    it('should not add the is-visible class', function () {
      const instance = FinalVerificationStep({ isVisible: false, finalStep: {} as any });
      expect(assertClassInStringBits(instance, 'is-visible')).toBe(false);
    });
  });

  describe('given the status is failure', function () {
    it('should add the is-failure class', function () {
      const instance = FinalVerificationStep({ status: 'failure', finalStep: {} as any });
      expect(assertClassInStringBits(instance, 'is-failure')).toBe(true);
    });
  });

  describe('given the status is not failure', function () {
    it('should not add the is-failure class', function () {
      const instance = FinalVerificationStep({ status: 'success', finalStep: {} as any });
      expect(assertClassInStringBits(instance, 'is-failure')).toBe(false);
    });
  });

  describe('given the isTestChain flag is set to true', function () {
    it('should add the is-test class', function () {
      const instance = FinalVerificationStep({ isTestChain: true, finalStep: {} as any });
      expect(assertClassInStringBits(instance, 'is-test')).toBe(true);
    });
  });

  describe('given the isTestChain flag is set to false', function () {
    it('should not add the is-test class', function () {
      const instance = FinalVerificationStep({ isTestChain: false, finalStep: {} as any });
      expect(assertClassInStringBits(instance, 'is-test')).toBe(false);
    });
  });

  describe('given the chain is provided', function () {
    it('should replace the chain in the text', function () {
      const fixtureFinalStep: IFinalStep = {

        description: 'here we test ${chain}',
        label: 'this is a test'
      };

      const instance = FinalVerificationStep({ chain: ['Bitcoin'], finalStep: fixtureFinalStep });
      expect(assertStringInValues(instance, 'here we test Bitcoin')).toBe(true);
    });
  });

  describe('given there is a link text', function () {
    describe('given the hideLink property is false', function () {
      let instance;

      beforeEach(function () {
        const fixtureFinalStep: IFinalStep = {
          linkText: 'Check transaction',
          description: '',
          label: ''
        };
        instance = FinalVerificationStep({ transactionLink: ['http://test.com'], finalStep: fixtureFinalStep });
      });

      afterEach(function () {
        instance = null;
      });

      it('should use the transaction link', function () {
        expect(assertStringInValues(instance, 'http://test.com')).toBe(true);
      });

      it('should use the linkText', function () {
        expect(assertStringInValues(instance, 'Check transaction')).toBe(true);
      });
    });

    describe('given the hideLink property is true', function () {
      it('should not show the link', function () {
        const fixtureFinalStep: IFinalStep = {
          linkText: 'Check transaction',
          description: '',
          label: ''
        };
        const instance = FinalVerificationStep({ transactionLink: ['http://test.com'], finalStep: fixtureFinalStep, hideLink: true });
        expect(assertClassInStringBits(instance, 'buv-qa-transaction-link')).toBe(false);
      });
    });
  });
});
