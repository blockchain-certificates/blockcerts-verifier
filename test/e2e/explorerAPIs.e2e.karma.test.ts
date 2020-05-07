import sinon from 'sinon';
import wait from './helpers/wait';
import { ExplorerAPI } from '@blockcerts/cert-verifier-js';

describe('explorerAPIs e2e test suite', function () {
  const parsingFunctionStub = sinon.stub();

  beforeAll(function () {
    const fixtureExplorer: ExplorerAPI = {
      serviceURL: 'https://www.blockcerts.org',
      parsingFunction: parsingFunctionStub,
      priority: 0
    };
    const verifier: any = document.querySelector('blockcerts-verifier');
    verifier.explorerAPIs = [fixtureExplorer];
    verifier.src = 'https://blockcerts.learningmachine.com/certificate/fe53b323df845641b74e8d3f6d175ea0';
  });

  afterAll(function () {
    parsingFunctionStub.resetHistory();
  });

  it('should call the explorer\'s parsing function', async function () {
    await wait(4000);
    expect(parsingFunctionStub.calledOnce).toBe(true);
  });
});
