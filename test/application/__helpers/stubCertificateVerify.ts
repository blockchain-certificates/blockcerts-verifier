import sinon from 'sinon';
import { Certificate, retrieveBlockcertsVersion, BlockcertsVersion } from '@blockcerts/cert-verifier-js/dist/verifier-es';
import { Certificate as CertificateV1 } from '@blockcerts/cert-verifier-js-v1-legacy';
import domain from '../../../src/domain';
import VERIFICATION_STATUS from '../../../src/constants/verificationStatus';
import validCertificateStepsAssertions from '../../assertions/validCertificateSteps';
import invalidCertificateStepsAssertions from '../../assertions/invalidCertificateSteps';

function validVerifyStub (stepsCb): any {
  validCertificateStepsAssertions.forEach(step => step.subSteps.forEach(substep => stepsCb(substep)));
  return {
    status: VERIFICATION_STATUS.SUCCESS,
    message: {
      label: 'Verified',
      // eslint-disable-next-line no-template-curly-in-string
      description: 'This is a valid ${chain} certificate.',
      linkText: 'View transaction link'
    }
  };
}

function invalidVerifyStub (stepsCb): any {
  invalidCertificateStepsAssertions.forEach(step => step.subSteps.forEach(substep => stepsCb(substep)));
  return {
    status: VERIFICATION_STATUS.FAILURE,
    message: {
      label: 'Error'
    }
  };
}

export default function stubCertificateVerify (certificateFixture, valid = true): void {
  if (!certificateFixture) {
    throw new Error('No certificate definition passed to mock its verify option. Make sure to pass the same certificate as the one you will put in the state for the test.');
  }

  const fixtureVersion: BlockcertsVersion = retrieveBlockcertsVersion(certificateFixture['@context']);

  let domainParseStub;

  beforeEach(async function () {
    let parsedCertificate;
    if (fixtureVersion.versionNumber === 1) {
      parsedCertificate = new CertificateV1(certificateFixture);
    } else {
      parsedCertificate = new Certificate(certificateFixture);
    }
    await parsedCertificate.init();
    domainParseStub = sinon.stub(domain.certificates, 'parse').returns({
      certificateDefinition: {
        ...parsedCertificate,
        verify: valid ? validVerifyStub : invalidVerifyStub
      }
    });
    global.domainParseStub = domainParseStub;
  });

  afterEach(function () {
    domainParseStub.restore();
  });
}
