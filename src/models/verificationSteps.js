export const mainSteps = [
  {
    code: 'formatValidation',
    name: 'Format validation',
    labelProcess: 'Validating format'
  }, {
    code: 'hashComparison',
    name: 'Hash comparison',
    labelProcess: 'Comparing hash'
  }, {
    code: 'statusCheck',
    name: 'Status check',
    labelProcess: 'Checking record status'
  }
];

export const substepMap = [
  {
    code: 'getTransactionId',
    parentStep: 'formatValidation'
  },
  {
    code: 'computeLocalHash',
    parentStep: 'formatValidation'
  },
  {
    code: 'fetchRemoteHash',
    parentStep: 'formatValidation'
  },
  {
    code: 'getIssuerProfile',
    parentStep: 'formatValidation'
  },
  {
    code: 'parseIssuerKeys',
    parentStep: 'formatValidation'
  },
  {
    code: 'compareHashes',
    parentStep: 'hashComparison'
  },
  {
    code: 'checkMerkleRoot',
    parentStep: 'hashComparison'
  },
  {
    code: 'checkReceipt',
    parentStep: 'hashComparison'
  },
  {
    code: 'checkRevokedStatus',
    parentStep: 'statusCheck'
  },
  {
    code: 'checkAuthenticity',
    parentStep: 'statusCheck'
  },
  {
    code: 'checkExpiresDate',
    parentStep: 'statusCheck'
  }
];
