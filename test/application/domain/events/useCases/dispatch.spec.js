import sinon from 'sinon';
import domain from '../../../../../src/domain';
import certificateFixture from '../../../../fixtures/valid-certificate-example';

describe('domain events dispatch method test suite', function () {
  describe('given it is not called with a type', function () {
    it('should not emit an event', function () {
      const { certificateDefinition } = domain.certificates.parse(certificateFixture);
      const dispatchEventSpy = sinon.spy(window, 'dispatchEvent');

      domain.events.dispatch('', certificateDefinition);
      expect(dispatchEventSpy.calledOnce).toBe(false);

      dispatchEventSpy.restore();
    });
  });

  describe('given it is not called with a certificate definition', function () {
    it('should not emit an event', function () {
      const eventType = 'test-event';
      const dispatchEventSpy = sinon.spy(window, 'dispatchEvent');

      domain.events.dispatch(eventType);
      expect(dispatchEventSpy.calledOnce).toBe(false);

      dispatchEventSpy.restore();
    });
  });

  describe('given it is called with a type and a certificate definition', function () {
    it('should emit an event with the certificate id', function () {
      const eventType = 'test-event';
      const { certificateDefinition } = domain.certificates.parse(certificateFixture);
      let wasCalled = false;

      window.addEventListener(eventType, function (e) {
        wasCalled = true;
        expect(e.detail.uid).toBe('https://auto-certificates.learningmachine.io/certificate/54ae740e31aa571a8c718fa84924da97');
      });

      domain.events.dispatch(eventType, certificateDefinition);

      // add failsafe, if no expect is called test is false positive
      expect(wasCalled).toBe(true);
    });

    describe('and there are some extra details provided', function () {
      it('should pass the extra details to the event', function () {
        const eventType = 'test-event';
        const { certificateDefinition } = domain.certificates.parse(certificateFixture);
        const testKey = 'Hello!';
        const extraDetails = {
          testKey
        };
        let wasCalled = false;
        window.addEventListener(eventType, function (e) {
          wasCalled = true;
          expect(e.detail.testKey).toBe(testKey);
        });

        domain.events.dispatch(eventType, certificateDefinition, extraDetails);

        // add failsafe, if no expect is called test is false positive
        expect(wasCalled).toBe(true);
      });
    });
  });
});
