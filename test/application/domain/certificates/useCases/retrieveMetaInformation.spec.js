import domain from '../../../../../src/domain';
import certificateFixture from '../../../../fixtures/valid-certificate-example';

describe('domain certificates retrieveMetaInformation method test suite', function () {
  describe('given a valid certificate definition', function () {
    it('should retrieve the transactionLink information', function () {
      const expectedOutput = 'https://testnet.blockchain.info/tx/62b48b3bd8ead185ac38c844648dc3f7b1dcb08283d1de6c7eb8ae9f9f5daeea';
      expect(domain.certificates.retrieveMetaInformation(certificateFixture).transactionLink).toBe(expectedOutput);
    });
  });
});
