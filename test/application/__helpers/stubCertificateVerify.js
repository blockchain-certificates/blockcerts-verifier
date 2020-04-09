import sinon from 'sinon';
import { Certificate } from '@blockcerts/cert-verifier-js/dist/verifier-es';
import domain from '../../../src/domain';
import VERIFICATION_STATUS from '../../../src/constants/verificationStatus';
import validCertificateStepsAssertions from '../../assertions/validCertificateSteps';
import invalidCertificateStepsAssertions from '../../assertions/invalidCertificateSteps';

function validVerifyStub (stepsCb) {
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

function invalidVerifyStub (stepsCb) {
  invalidCertificateStepsAssertions.forEach(step => step.subSteps.forEach(substep => stepsCb(substep)));
  return {
    status: VERIFICATION_STATUS.FAILURE,
    message: {
      label: 'Verified',
      // eslint-disable-next-line no-template-curly-in-string
      description: 'This is a valid ${chain} certificate.',
      linkText: 'View transaction link'
    }
  };
}

export default function stubCertificateVerify (certificateFixture, valid = true) {
  if (!certificateFixture) {
    throw new Error('No certificate definition passed to mock its verify option. Make sure to pass the same certificate as the one you will put in the state for the test.');
  }

  let domainParseStub;

  beforeEach(async function () {
    const parsedCertificate = new Certificate(certificateFixture);
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
