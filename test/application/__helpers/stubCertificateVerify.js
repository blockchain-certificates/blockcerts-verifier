import sinon from 'sinon';
import { Certificate } from '@blockcerts/cert-verifier-js/dist/verifier-es';
import domain from '../../../src/domain';
import VERIFICATION_STATUS from '../../../src/constants/verificationStatus';

export default function stubCertificateVerify (certificateFixture) {
  if (!certificateFixture) {
    throw new Error('No certificate definition passed to mock its verify option. Make sure to pass the same certificate as the one you will put in the state for the test.');
  }

  let domainParseStub;

  beforeEach(function () {
    const parsedCertificate = new Certificate(certificateFixture);
    domainParseStub = sinon.stub(domain.certificates, 'parse').returns({
      certificateDefinition: {
        ...parsedCertificate,
        verify: () => ({
          status: VERIFICATION_STATUS.SUCCESS
        })
      }
    });
    global.domainParseStub = domainParseStub;
  });

  afterEach(function () {
    domainParseStub.restore();
  });
}
