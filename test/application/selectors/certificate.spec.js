import getInitialState from '../../../src/store/getInitialState';
import {
  getCertificateTitle,
  getChain,
  getDisplayHTML,
  getDownloadLink,
  getIssueDate,
  getIssuedOn,
  getIssuerLogo,
  getIssuerName,
  getMetadataJson,
  getRecipientName,
  getRecordLink,
  getStartedVerificationSteps,
  getTransactionId,
  getTransactionLink,
  getVerifiedSteps
} from '../../../src/selectors/certificate';
import * as VERIFICATION_STATUS from '../../../src/constants/verificationStatus';
import v1Fixture from '../../fixtures/valid-v1-certificate';
import v2Fixture from '../../fixtures/valid-certificate-example';
import { configureStore } from '../../../src/store';
import updateCertificateDefinition from '../../../src/actions/updateCertificateDefinition';

describe('certificate selectors test suite', function () {
  let initialState;
  let store;

  beforeEach(function () {
    initialState = getInitialState({ disableAutoVerify: true });
    store = configureStore(initialState);
  });

  afterEach(function () {
    initialState = null;
    store = null;
  });

  describe('getStartedVerificationSteps selector', function () {
    it('should return only the steps which have a started verification', function () {
      const state = getInitialState();
      const verifiedSteps = getVerifiedSteps(state);
      getVerifiedSteps(state)[0].status = VERIFICATION_STATUS.STARTED;

      expect(getStartedVerificationSteps(state)).toEqual([verifiedSteps[0]]);
    });
  });

  describe('getIssuedOn selector', function () {
    it('should return the date of issuance for a v1 certificate', function () {
      store.dispatch(updateCertificateDefinition(v1Fixture));
      const state = store.getState();

      expect(getIssuedOn(state)).toBe('2017-05-05T16:45:26.925+00:00');
    });

    it('should return the date of issuance for a v2 certificate', function () {
      store.dispatch(updateCertificateDefinition(v2Fixture));
      const state = store.getState();

      expect(getIssuedOn(state)).toBe('2018-01-23T00:43:15.978+00:00');
    });
  });

  describe('getIssueDate selector', function () {
    it('should return a readable date for a v1 certificate', function () {
      store.dispatch(updateCertificateDefinition(v1Fixture));
      const state = store.getState();

      expect(getIssueDate(state)).toBe('May 5, 2017');
    });

    it('should return a readable date for a v2 certificate', function () {
      store.dispatch(updateCertificateDefinition(v2Fixture));
      const state = store.getState();

      expect(getIssueDate(state)).toBe('Jan 23, 2018');
    });
  });

  describe('getRecipientName selector', function () {
    it('should return a the recipient\'s name for a v1 certificate', function () {
      store.dispatch(updateCertificateDefinition(v1Fixture));
      const state = store.getState();

      expect(getRecipientName(state)).toBe('Certs_Test Auto_Recipient');
    });

    it('should return the recipient\'s name for a v2 certificate', function () {
      store.dispatch(updateCertificateDefinition(v2Fixture));
      const state = store.getState();

      expect(getRecipientName(state)).toBe('Jérôme Collé');
    });
  });

  describe('getCertificateTitle selector', function () {
    it('should return the certificate\'s title for a v1 certificate', function () {
      store.dispatch(updateCertificateDefinition(v1Fixture));
      const state = store.getState();

      expect(getCertificateTitle(state)).toBe('Test Certificate Title for Wallet 2017-5-5-16-44-26');
    });

    it('should return the certificate\'s title for a v2 certificate', function () {
      store.dispatch(updateCertificateDefinition(v2Fixture));
      const state = store.getState();

      expect(getCertificateTitle(state)).toBe('Test certificate');
    });
  });

  describe('getIssuerName selector', function () {
    it('should return the issuer\'s name for a v1 certificate', function () {
      store.dispatch(updateCertificateDefinition(v1Fixture));
      const state = store.getState();

      expect(getIssuerName(state)).toBe('Test Automation Org Auto');
    });

    it('should return the issuer\'s name for a v2 certificate', function () {
      store.dispatch(updateCertificateDefinition(v2Fixture));
      const state = store.getState();

      expect(getIssuerName(state)).toBe('Auto Testnet');
    });
  });

  describe('getIssuerLogo selector', function () {
    it('should return the issuer\'s logo for a v1 certificate', function () {
      store.dispatch(updateCertificateDefinition(v1Fixture));
      const state = store.getState();

      expect(getIssuerLogo(state)).toBe(v1Fixture.document.certificate.issuer.image);
    });

    it('should return the issuer\'s logo for a v2 certificate', function () {
      store.dispatch(updateCertificateDefinition(v2Fixture));
      const state = store.getState();

      expect(getIssuerLogo(state)).toBe(v2Fixture.badge.issuer.image);
    });
  });

  describe('getDisplayHTML selector', function () {
    it('should return the displayHTML of a v2 certificate', function () {
      store.dispatch(updateCertificateDefinition(v2Fixture));
      const state = store.getState();

      expect(getDisplayHTML(state)).toBe('<section class="text" style="margin-top:12px;width:100%;display:inline-block;"><span style="display:block;font-family:Georgia, serif;font-weight:normal;font-size:1.25em;text-align:center;text-transform:none;margin:0 auto;width:100%;">YO!</span></section>');
    });
  });

  describe('getRecordLink selector', function () {
    it('should return the record\'s link for a v1 certificate', function () {
      store.dispatch(updateCertificateDefinition(v1Fixture));
      const state = store.getState();

      expect(getRecordLink(state)).toBe('https://auto-certificates.learningmachine.io/certificate/0deb417b8ac84796b10167bd493775f9');
    });

    it('should return the record\'s link for a v2 certificate', function () {
      store.dispatch(updateCertificateDefinition(v2Fixture));
      const state = store.getState();

      expect(getRecordLink(state)).toBe('https://auto-certificates.learningmachine.io/certificate/54ae740e31aa571a8c718fa84924da97');
    });
  });

  describe('getDownloadLink selector', function () {
    it('should return the record\'s download link for a v1 certificate', function () {
      store.dispatch(updateCertificateDefinition(v1Fixture));
      const state = store.getState();

      expect(getDownloadLink(state)).toBe('https://auto-certificates.learningmachine.io/certificate/0deb417b8ac84796b10167bd493775f9?format=json');
    });

    it('should return the record\'s download link for a v2 certificate', function () {
      store.dispatch(updateCertificateDefinition(v2Fixture));
      const state = store.getState();

      expect(getDownloadLink(state)).toBe('https://auto-certificates.learningmachine.io/certificate/54ae740e31aa571a8c718fa84924da97?format=json');
    });
  });

  describe('getMetadataJson selector', function () {
    it('should return metadata of a v1 certificate', function () {
      store.dispatch(updateCertificateDefinition(v1Fixture));
      const state = store.getState();

      expect(getMetadataJson(state)).toEqual(JSON.parse(v1Fixture.document.assertion.metadataJson));
    });

    it('should return metadata of a v2 certificate', function () {
      store.dispatch(updateCertificateDefinition(v2Fixture));
      const state = store.getState();

      expect(getMetadataJson(state)).toEqual(JSON.parse(v2Fixture.metadataJson));
    });
  });

  describe('getTransactionLink selector', function () {
    it('should return the transaction\'s link for a v1 certificate', function () {
      store.dispatch(updateCertificateDefinition(v1Fixture));
      const state = store.getState();

      expect(getTransactionLink(state)).toEqual('https://testnet.blockchain.info/tx/00dbc2c28a6d84653687c7ee2521fb73af1a907c8fcce93ac2c413a1298cd69d');
    });

    it('should return the transaction\'s link for a v2 certificate', function () {
      store.dispatch(updateCertificateDefinition(v2Fixture));
      const state = store.getState();

      expect(getTransactionLink(state)).toEqual('https://testnet.blockchain.info/tx/62b48b3bd8ead185ac38c844648dc3f7b1dcb08283d1de6c7eb8ae9f9f5daeea');
    });
  });

  describe('getTransactionId selector', function () {
    it('should return the transaction\'s id link for a v1 certificate', function () {
      store.dispatch(updateCertificateDefinition(v1Fixture));
      const state = store.getState();

      expect(getTransactionId(state)).toEqual('00dbc2c28a6d84653687c7ee2521fb73af1a907c8fcce93ac2c413a1298cd69d');
    });

    it('should return the transaction\'s id link for a v2 certificate', function () {
      store.dispatch(updateCertificateDefinition(v2Fixture));
      const state = store.getState();

      expect(getTransactionId(state)).toEqual('62b48b3bd8ead185ac38c844648dc3f7b1dcb08283d1de6c7eb8ae9f9f5daeea');
    });
  });

  describe('getChain selector', function () {
    it('should return the transaction\'s id link for a v1 certificate', function () {
      store.dispatch(updateCertificateDefinition(v1Fixture));
      const state = store.getState();

      expect(getChain(state)).toEqual('Mocknet');
    });

    it('should return the transaction\'s id link for a v2 certificate', function () {
      store.dispatch(updateCertificateDefinition(v2Fixture));
      const state = store.getState();

      expect(getChain(state)).toEqual('Mocknet');
    });
  });
});
