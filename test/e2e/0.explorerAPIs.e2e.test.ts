import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';
import '../../dist/ie11';
import { ExplorerAPI } from '@blockcerts/cert-verifier-js';
import { wait } from './helpers/waitForKarma';

describe('BlockcertsVerifier explorer apis e2e test suite', function () {
  describe('given the verification process is executed', function () {
    it('should call the custom explorer', async function () {
      this.timeout(3000);
      const parsingFunctionStub = sinon.stub().returns('{}');
      const explorerAPI: ExplorerAPI = {
        parsingFunction: parsingFunctionStub,
        priority: 0,
        // we provide a URL that returns a JSON to avoid any issue in cert verifier js explorer execution
        serviceURL: 'https://raw.githubusercontent.com/blockchain-certificates/blockcerts-verifier/master/test/fixtures/mainnet-valid-2.0.json'
      };
      const element: any = await fixture(html`
        <blockcerts-verifier></blockcerts-verifier>
      `); // TODO: define type as BlockcertsVerifier
      element.explorerAPIs = [explorerAPI];
      await wait(10);
      element.src = 'https://blockcerts.learningmachine.com/certificate/fe53b323df845641b74e8d3f6d175ea0';
      await wait(2000);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(parsingFunctionStub.calledOnce).to.be.true;
    });
  });
});
