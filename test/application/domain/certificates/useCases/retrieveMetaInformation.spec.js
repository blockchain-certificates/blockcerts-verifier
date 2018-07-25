import domain from '../../../../../src/domain';
import certificateFixture from '../../../../fixtures/valid-certificate-example';

describe('domain certificates retrieveMetaInformation method test suite', function () {
  describe('given a valid certificate definition', function () {
    it('should retrieve the transactionLink information', function () {
      const expectedOutput = 'https://testnet.blockchain.info/tx/62b48b3bd8ead185ac38c844648dc3f7b1dcb08283d1de6c7eb8ae9f9f5daeea';
      expect(domain.certificates.retrieveMetaInformation(certificateFixture).transactionLink).toBe(expectedOutput);
    });

    it('should retrieve the chain information', function () {
      const expectedOutput = {
        'code': 'testnet',
        'name': 'Mocknet',
        'signatureValue': 'bitcoinTestnet',
        'transactionTemplates': {
          'full': 'https://testnet.blockchain.info/tx/{TRANSACTION_ID}',
          'raw': 'https://testnet.blockchain.info/rawtx/{TRANSACTION_ID}'
        }
      };
      expect(domain.certificates.retrieveMetaInformation(certificateFixture).chain).toEqual(expectedOutput);
    });
  });
});
