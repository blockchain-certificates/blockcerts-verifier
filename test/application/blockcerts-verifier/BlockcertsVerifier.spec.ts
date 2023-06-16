import sinon from 'sinon';
import { SourceComponent as BlockcertsVerifier } from '../../../src/blockcerts-verifier/BlockcertsVerifier';

describe('BlockcertsVerifier test suite', function () {
  let onLoadSpy;
  let instance;

  beforeEach(function () {
    onLoadSpy = sinon.spy();
    instance = new BlockcertsVerifier();
    instance.onLoad = onLoadSpy;
  });

  afterEach(function () {
    instance = null;
    onLoadSpy.resetHistory();
  });

  describe('_firstRendered method', function () {
    const fixtureProps = {
      test: true
    };

    beforeEach(function () {
      instance._props = fixtureProps;
      instance._firstRendered();
    });

    it('should set the hasRenderedOnce property to true', function () {
      expect(instance.hasRenderedOnce).toBe(true);
    });

    it('should call the onLoad method with the component props', function () {
      expect(onLoadSpy.firstCall.args[0]).toEqual(fixtureProps);
    });
  });

  describe('_propertiesChanged method', function () {
    describe('given it has not yet rendered', function () {
      describe('and the src property changed', function () {
        it('should not call the onLoad method', function () {
          instance._propertiesChanged({}, { src: 'new-certificate-url' }, {});
          expect(onLoadSpy.calledOnce).toBe(false);
        });
      });
    });

    describe('given it has rendered', function () {
      describe('and the src property changed', function () {
        it('should call the onLoad method with the new src value', function () {
          instance._firstRendered();
          const fixtureSRC = 'new-certificate-url';

          instance._propertiesChanged({}, { src: fixtureSRC }, {});
          // is called once in _firstRendered
          expect(onLoadSpy.secondCall.args[0].src).toBe(fixtureSRC);
        });
      });
    });

    describe('given the explorerAPIs was not initially set', function () {
      describe('and is set later on', function () {
        it('should call the onLoad method with the explorerAPIs set', function () {
          const fixtureExplorerAPIs = [{
            priority: 0,
            parsingFunction: () => {},
            serviceURL: 'test.com'
          }];
          instance._propertiesChanged({}, { explorerAPIs: fixtureExplorerAPIs }, {});
          expect(onLoadSpy.firstCall.args[0].explorerAPIs).toEqual(fixtureExplorerAPIs);
        });
      });
    });
  });
});
