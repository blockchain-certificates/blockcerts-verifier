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
    step: 'formatValidation',
  },
  {
    code: 'computingLocalHash',
    step: 'formatValidation',
  },
  {
    code: 'fetchingRemoteHash',
    step: 'formatValidation',
  },
  {
    code: 'gettingIssuerProfile',
    step: 'formatValidation',
  },
  {
    code: 'parsingIssuerKeys',
    step: 'formatValidation',
  },
  {
    code: 'comparingHashes',
    step: 'hashComparison',
  },
  {
    code: 'checkingMerkleRoot',
    step: 'hashComparison',
  },
  {
    code: 'checkingReceipt',
    step: 'hashComparison',
  },
  {
    code: 'checkingRevokedStatus',
    step: 'statusCheck',
  },
  {
    code: 'checkingAuthenticity',
    step: 'statusCheck',
  },
  {
    code: 'checkingExpiresDate',
    step: 'statusCheck',
  }
];