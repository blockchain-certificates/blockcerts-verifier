import CertificateDetails from '../../../../src/components/atoms/CertificateDetails/CertificateDetails';
import { assertClassInStringBits } from '../helpers/assertStringValues';

const FIXTURE_LINK = 'http://test.com';
const FIXTURE_INVALID_LINK = 'not a link';
const FIXTURE_NAME = 'Gérald Durand';
const FIXTURE_ISSUE_DATE = 'Jan 28, 2020';
const FIXTURE_ISSUED_ON = '2020-01-28T00:43:15.978+00:00';
const FIXTURE_ISSUER_NAME = 'Multinational Organization';
const FIXTURE_TRANSACTION_ID = 'transaction-id';
const FIXTURE_PUBLIC_KEY = 'public-key';

describe('CertificateDetails test suite', function () {
  describe('given the hideRecipientName is false', function () {
    it('should render the recipient name', function () {
      const instance = CertificateDetails({ hideRecipientName: false, recipientName: FIXTURE_NAME, transactionLink: FIXTURE_LINK });
      const instanceAsString = JSON.stringify(instance);
      expect(instanceAsString).toContain(FIXTURE_NAME);
    });
  });

  describe('given the hideRecipientName is true', function () {
    it('should not render the recipient name', function () {
      const instance = CertificateDetails({ hideRecipientName: true, recipientName: FIXTURE_NAME, transactionLink: FIXTURE_LINK });
      const instanceAsString = JSON.stringify(instance);
      expect(instanceAsString).not.toContain(FIXTURE_NAME);
    });
  });

  it('should render the issueDate', function () {
    const instance = CertificateDetails({ issueDate: FIXTURE_ISSUE_DATE, transactionLink: FIXTURE_LINK });
    const instanceAsString = JSON.stringify(instance);
    expect(instanceAsString).toContain(FIXTURE_ISSUE_DATE);
  });

  it('should render the issuedOn', function () {
    const instance = CertificateDetails({ issuedOn: FIXTURE_ISSUED_ON, transactionLink: FIXTURE_LINK });
    const instanceAsString = JSON.stringify(instance);
    // test should be improved: reconciling strings and values to test "datetime=FIXTURE_ISSUED_ON"
    expect(instanceAsString).toContain(FIXTURE_ISSUED_ON);
  });

  it('should render the issuer\'s name', function () {
    const instance = CertificateDetails({ issuerName: FIXTURE_ISSUER_NAME, transactionLink: FIXTURE_LINK });
    const instanceAsString = JSON.stringify(instance);
    expect(instanceAsString).toContain(FIXTURE_ISSUER_NAME);
  });

  it('should render the issuer\'s public key', function () {
    const instance = CertificateDetails({ issuerPublicKey: FIXTURE_PUBLIC_KEY, transactionLink: FIXTURE_LINK });
    const instanceAsString = JSON.stringify(instance);
    expect(instanceAsString).toContain(FIXTURE_PUBLIC_KEY);
  });

  describe('given the transactionLink is valid', function () {
    it('should render the the transactionId', function () {
      const instance = CertificateDetails({ transactionId: FIXTURE_TRANSACTION_ID, transactionLink: FIXTURE_LINK });
      const instanceAsString = JSON.stringify(instance);
      expect(instanceAsString).toContain(FIXTURE_TRANSACTION_ID);
    });
  });

  describe('given the transactionLink is invalid', function () {
    let instance;

    beforeEach(function () {
      instance = CertificateDetails({ transactionId: FIXTURE_TRANSACTION_ID, transactionLink: FIXTURE_INVALID_LINK });
    });

    afterEach(function () {
      instance = null;
    });

    it('should render the the transactionId', function () {
      const instanceAsString = JSON.stringify(instance);
      expect(instanceAsString).not.toContain(FIXTURE_TRANSACTION_ID);
    });

    it('should render a placeholder string', function () {
      const instanceAsString = JSON.stringify(instance);
      expect(instanceAsString).toContain('No transaction ID');
    });
  });

  describe('given the direction is column', function () {
    it('should render in column', function () {
      const instance = CertificateDetails({ direction: 'column', transactionLink: FIXTURE_LINK });
      expect(assertClassInStringBits(instance, 'buv-c-certificate-details--column')).toBe(true);
    });
  });

  describe('given the direction is not column', function () {
    it('should not render in column', function () {
      const instance = CertificateDetails({ direction: '', transactionLink: FIXTURE_LINK });
      expect(assertClassInStringBits(instance, 'buv-c-certificate-details--column')).toBe(false);
    });
  });
});
