import VERIFICATION_STATUS from '../../../constants/verificationStatus';

export default function initializeVerificationSteps (definition) {
  const steps = JSON.parse(JSON.stringify(definition.verificationSteps));
  return steps.map(step => ({
    ...step,
    status: VERIFICATION_STATUS.DEFAULT
  }));
}
