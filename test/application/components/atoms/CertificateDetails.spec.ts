import CertificateDetails from '../../../../src/components/atoms/CertificateDetails/CertificateDetails';
import { assertClassInStringBits } from '../helpers/assertStringValues';
import { getText } from '../../../../src/i18n';
import getOrdinalNumber from '../../../../src/i18n/getOrdinalNumber';

const FIXTURE_NAME = 'Gérald Durand';
const FIXTURE_ISSUE_DATE = 'Jan 28, 2020';
const FIXTURE_ISSUED_ON = '2020-01-28T00:43:15.978+00:00';
const FIXTURE_ISSUER_NAME = 'Multinational Organization';
const FIXTURE_ISSUER_PROFILE_DOMAIN = ['https://www.multinational-organization.com'];
const FIXTURE_ISSUER_PROFILE_URL = ['https://www.multinational-organization.com/profile.json'];
const FIXTURE_TRANSACTION_ID = ['transaction-id'];
const FIXTURE_PUBLIC_KEY = ['public-key'];
const FIXTURE_SIGNATURE_TYPE = ['MerkleProof2019'];
const secondIssuerProfileDomain = 'https://www.another-organization.com';
const secondIssuerProfileUrl = 'https://www.another-organization.com/profile.json';
const secondSignatureType = 'Ed25519';
const secondPublicKey = 'another-public-key';
const TWO_FIXTURES_PUBLIC_KEYS = [...FIXTURE_PUBLIC_KEY, secondPublicKey];
const TWO_FIXTURES_SIGNATURE_TYPE = [...FIXTURE_SIGNATURE_TYPE, secondSignatureType];
const TWO_FIXTURES_TRANSACTION_ID = [...FIXTURE_TRANSACTION_ID, ''];
const TWO_FIXTURES_ISSUER_PROFILE_DOMAIN = [...FIXTURE_ISSUER_PROFILE_DOMAIN, secondIssuerProfileDomain];
const TWO_FIXTURES_ISSUER_PROFILE_URL = [...FIXTURE_ISSUER_PROFILE_URL, secondIssuerProfileUrl];

describe('CertificateDetails test suite', function () {
  let instance;
  let instanceAsString;

  afterEach(function () {
    instance = null;
    instanceAsString = '';
  });

  describe('given the hideRecipientName is false', function () {
    it('should render the recipient name', function () {
      const instance = CertificateDetails({
        issuerPublicKey: FIXTURE_PUBLIC_KEY,
        signatureSuiteType: FIXTURE_SIGNATURE_TYPE,
        hideRecipientName: false,
        recipientName: FIXTURE_NAME
      });
      const instanceAsString = JSON.stringify(instance);
      expect(instanceAsString).toContain(FIXTURE_NAME);
    });
  });

  describe('given the hideRecipientName is true', function () {
    it('should not render the recipient name', function () {
      const instance = CertificateDetails({
        issuerPublicKey: FIXTURE_PUBLIC_KEY,
        signatureSuiteType: FIXTURE_SIGNATURE_TYPE,
        hideRecipientName: true,
        recipientName: FIXTURE_NAME
      });
      const instanceAsString = JSON.stringify(instance);
      expect(instanceAsString).not.toContain(FIXTURE_NAME);
    });
  });

  it('should render the issueDate', function () {
    const instance = CertificateDetails({
      issuerPublicKey: FIXTURE_PUBLIC_KEY,
      signatureSuiteType: FIXTURE_SIGNATURE_TYPE,
      issueDate: FIXTURE_ISSUE_DATE
    });
    const instanceAsString = JSON.stringify(instance);
    expect(instanceAsString).toContain(FIXTURE_ISSUE_DATE);
  });

  it('should render the issuedOn', function () {
    const instance = CertificateDetails({
      issuerPublicKey: FIXTURE_PUBLIC_KEY,
      signatureSuiteType: FIXTURE_SIGNATURE_TYPE,
      issuedOn: FIXTURE_ISSUED_ON
    });
    const instanceAsString = JSON.stringify(instance);
    // test should be improved: reconciling strings and values to test "datetime=FIXTURE_ISSUED_ON"
    expect(instanceAsString).toContain(FIXTURE_ISSUED_ON);
  });

  it('should render the issuer\'s name', function () {
    const instance = CertificateDetails({
      issuerPublicKey: FIXTURE_PUBLIC_KEY,
      signatureSuiteType: FIXTURE_SIGNATURE_TYPE,
      issuerName: FIXTURE_ISSUER_NAME
    });
    const instanceAsString = JSON.stringify(instance);
    expect(instanceAsString).toContain(FIXTURE_ISSUER_NAME);
  });

  describe('given there is only one public key', function () {
    beforeEach(function () {
      instance = CertificateDetails({
        issuerPublicKey: FIXTURE_PUBLIC_KEY
      });
      instanceAsString = JSON.stringify(instance);
    });

    it('should render the issuer\'s public key', function () {
      expect(instanceAsString).toContain(FIXTURE_PUBLIC_KEY[0]);
    });

    it('should not render a transaction id title', function () {
      expect(instanceAsString).not.toContain(getText('text', 'transactionId'));
    });

    it('should not render a signature type title', function () {
      expect(instanceAsString).not.toContain(getText('text', 'signatureSuiteType'));
    });

    it('should not render a issuerProfileDomain title', function () {
      expect(instanceAsString).not.toContain(getText('text', 'issuerProfileDomain'));
    });

    it('should not use an ordinal indexer on the title', function () {
      expect(instanceAsString).not.toContain(`${getOrdinalNumber(1)} ${getText('text.issuerPublicKey')}`);
      expect(instanceAsString).toContain(getText('text', 'issuerPublicKey'));
    });

    describe('and a transactionId is set', function () {
      beforeEach(function () {
        instance = CertificateDetails({
          issuerPublicKey: FIXTURE_PUBLIC_KEY,
          transactionId: FIXTURE_TRANSACTION_ID
        });
        instanceAsString = JSON.stringify(instance);
      });

      it('value should be rendered', function () {
        expect(instanceAsString).toContain(FIXTURE_TRANSACTION_ID[0]);
      });

      it('should not use an ordinal indexer on the title', function () {
        expect(instanceAsString).not.toContain(`${getOrdinalNumber(1)} ${getText('text.transactionId')}`);
        expect(instanceAsString).toContain(getText('text', 'transactionId'));
      });
    });

    describe('and a signatureSuiteType is set', function () {
      beforeEach(function () {
        instance = CertificateDetails({
          issuerPublicKey: FIXTURE_PUBLIC_KEY,
          signatureSuiteType: FIXTURE_SIGNATURE_TYPE
        });
        instanceAsString = JSON.stringify(instance);
      });

      it('value should be rendered', function () {
        expect(instanceAsString).toContain(FIXTURE_SIGNATURE_TYPE[0]);
      });

      it('should not use an ordinal indexer on the title', function () {
        expect(instanceAsString).not.toContain(`${getOrdinalNumber(1)} ${getText('text.signatureSuiteType')}`);
        expect(instanceAsString).toContain(getText('text', 'signatureSuiteType'));
      });
    });

    describe('and a issuerProfileDomain is set', function () {
      beforeEach(function () {
        instance = CertificateDetails({
          issuerPublicKey: FIXTURE_PUBLIC_KEY,
          issuerProfileDomain: FIXTURE_ISSUER_PROFILE_DOMAIN,
          issuerProfileUrl: FIXTURE_ISSUER_PROFILE_URL
        });
        instanceAsString = JSON.stringify(instance);
      });

      it('value should be rendered', function () {
        expect(instanceAsString).toContain(FIXTURE_ISSUER_PROFILE_DOMAIN[0]);
      });

      it('with the issuer profile url as a link', function () {
        expect(instanceAsString).toContain(FIXTURE_ISSUER_PROFILE_URL[0]);
      });

      it('should not use an ordinal indexer on the title', function () {
        expect(instanceAsString).not.toContain(`${getOrdinalNumber(1)} ${getText('text.issuerProfileDomain')}`);
        expect(instanceAsString).toContain(getText('text', 'issuerProfileDomain'));
      });
    });
  });

  describe('given there are 2 public keys or more', function () {
    beforeEach(function () {
      instance = CertificateDetails({
        issuerPublicKey: TWO_FIXTURES_PUBLIC_KEYS,
        signatureSuiteType: TWO_FIXTURES_SIGNATURE_TYPE,
        transactionId: TWO_FIXTURES_TRANSACTION_ID,
        issuerProfileUrl: TWO_FIXTURES_ISSUER_PROFILE_URL,
        issuerProfileDomain: TWO_FIXTURES_ISSUER_PROFILE_DOMAIN
      });
      instanceAsString = JSON.stringify(instance);
    });

    it('should render the first issuer\'s public key', function () {
      expect(instanceAsString).toContain(FIXTURE_PUBLIC_KEY[0]);
    });

    it('should use the correct ordinal indexer on the first title', function () {
      expect(instanceAsString).toContain(`${getOrdinalNumber(1)} ${getText('text.issuerPublicKey')}`);
    });

    it('should render the second issuer\'s public key', function () {
      expect(instanceAsString).toContain(secondPublicKey);
    });

    it('should use the correct ordinal indexer on the second title', function () {
      expect(instanceAsString).toContain(`${getOrdinalNumber(2)} ${getText('text.issuerPublicKey')}`);
    });

    it('should render the first signatureSuiteType key', function () {
      expect(instanceAsString).toContain(FIXTURE_SIGNATURE_TYPE[0]);
    });

    it('should use the correct ordinal indexer on the first title', function () {
      expect(instanceAsString).toContain(`${getOrdinalNumber(1)} ${getText('text.signatureSuiteType')}`);
    });

    it('should render the second signatureSuiteType key', function () {
      expect(instanceAsString).toContain(secondSignatureType);
    });

    it('should use the correct ordinal indexer on the second title', function () {
      expect(instanceAsString).toContain(`${getOrdinalNumber(2)} ${getText('text.signatureSuiteType')}`);
    });

    it('should render the first issuerProfileDomain key', function () {
      expect(instanceAsString).toContain(FIXTURE_ISSUER_PROFILE_DOMAIN[0]);
    });

    it('should render the first issuerProfileUrl key', function () {
      expect(instanceAsString).toContain(FIXTURE_ISSUER_PROFILE_URL[0]);
    });

    it('should use the correct ordinal indexer on the first title', function () {
      expect(instanceAsString).toContain(`${getOrdinalNumber(1)} ${getText('text.issuerProfileDomain')}`);
    });

    it('should render the second issuerProfileDomain key', function () {
      expect(instanceAsString).toContain(secondIssuerProfileDomain);
    });

    it('should render the second issuerProfileUrl key', function () {
      expect(instanceAsString).toContain(secondIssuerProfileUrl);
    });

    it('should use the correct ordinal indexer on the second title', function () {
      expect(instanceAsString).toContain(`${getOrdinalNumber(2)} ${getText('text.issuerProfileDomain')}`);
    });

    it('should render the first transactionId key', function () {
      expect(instanceAsString).toContain(FIXTURE_TRANSACTION_ID[0]);
    });

    it('should use the correct ordinal indexer on the first title', function () {
      expect(instanceAsString).toContain(`${getOrdinalNumber(1)} ${getText('text.transactionId')}`);
    });

    it('should not render the second transactionId key as empty', function () {
      expect(instanceAsString).not.toContain(`${getOrdinalNumber(2)} ${getText('text.transactionId')}`);
    });
  });

  describe('given the direction is column', function () {
    it('should render in column', function () {
      const instance = CertificateDetails({
        issuerPublicKey: FIXTURE_PUBLIC_KEY,
        signatureSuiteType: FIXTURE_SIGNATURE_TYPE,
        direction: 'column'
      });
      expect(assertClassInStringBits(instance, 'buv-c-certificate-details--column')).toBe(true);
    });
  });

  describe('given the direction is not column', function () {
    it('should not render in column', function () {
      const instance = CertificateDetails({
        issuerPublicKey: FIXTURE_PUBLIC_KEY,
        signatureSuiteType: FIXTURE_SIGNATURE_TYPE,
        direction: ''
      });
      expect(assertClassInStringBits(instance, 'buv-c-certificate-details--column')).toBe(false);
    });
  });
});
