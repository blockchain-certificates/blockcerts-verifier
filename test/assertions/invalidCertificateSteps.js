export default [{
  'code': 'formatValidation',
  'label': 'Format validation',
  'labelPending': 'Validating format',
  'status': 'failure',
  'isLast': false,
  'subSteps': [{
    'code': 'getTransactionId',
    'label': 'Getting transaction ID',
    'parentStep': 'formatValidation',
    'status': 'success'
  }, {
    'code': 'computeLocalHash',
    'label': 'Computing local hash',
    'parentStep': 'formatValidation',
    'status': 'success'
  }, {
    'code': 'fetchRemoteHash',
    'errorMessage': 'Could not confirm the transaction',
    'label': 'Fetching remote hash',
    'parentStep': 'formatValidation',
    'status': 'failure'
  }, {
    'code': 'getIssuerProfile',
    'label': 'Get issuer profile',
    'labelPending': 'Getting issuer profile',
    'parentStep': 'formatValidation'
  }, {
    'code': 'parseIssuerKeys',
    'label': 'Parse issuer keys',
    'labelPending': 'Parsing issuer keys',
    'parentStep': 'formatValidation'
  }]
}, {
  'code': 'hashComparison',
  'label': 'Hash comparison',
  'labelPending': 'Comparing hash',
  'status': 'standby',
  'isLast': false,
  'subSteps': [{
    'code': 'compareHashes',
    'label': 'Compare hashes',
    'labelPending': 'Comparing hashes',
    'parentStep': 'hashComparison'
  }, {
    'code': 'checkMerkleRoot',
    'label': 'Check Merkle Root',
    'labelPending': 'Checking Merkle Root',
    'parentStep': 'hashComparison'
  }, {
    'code': 'checkReceipt',
    'label': 'Check Receipt',
    'labelPending': 'Checking Receipt',
    'parentStep': 'hashComparison'
  }]
}, {
  'code': 'statusCheck',
  'label': 'Status check',
  'labelPending': 'Checking record status',
  'status': 'standby',
  'isLast': true,
  'subSteps': [{
    'code': 'checkRevokedStatus',
    'label': 'Check Revoked Status',
    'labelPending': 'Checking Revoked Status',
    'parentStep': 'statusCheck'
  }, {
    'code': 'checkAuthenticity',
    'label': 'Check Authenticity',
    'labelPending': 'Checking Authenticity',
    'parentStep': 'statusCheck'
  }, {
    'code': 'checkExpiresDate',
    'label': 'Check Expiration Date',
    'labelPending': 'Checking Expiration Date',
    'parentStep': 'statusCheck'
  }]
}];
