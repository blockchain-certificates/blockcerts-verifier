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
    parentStep: 'formatValidation',
  },
  {
    code: 'computingLocalHash',
    parentStep: 'formatValidation',
  },
  {
    code: 'fetchingRemoteHash',
    parentStep: 'formatValidation',
  },
  {
    code: 'gettingIssuerProfile',
    parentStep: 'formatValidation',
  },
  {
    code: 'parsingIssuerKeys',
    parentStep: 'formatValidation',
  },
  {
    code: 'comparingHashes',
    parentStep: 'hashComparison',
  },
  {
    code: 'checkingMerkleRoot',
    parentStep: 'hashComparison',
  },
  {
    code: 'checkingReceipt',
    parentStep: 'hashComparison',
  },
  {
    code: 'checkingRevokedStatus',
    parentStep: 'statusCheck',
  },
  {
    code: 'checkingAuthenticity',
    parentStep: 'statusCheck',
  },
  {
    code: 'checkingExpiresDate',
    parentStep: 'statusCheck',
  }
];