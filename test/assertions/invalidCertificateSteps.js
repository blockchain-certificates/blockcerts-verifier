export default [{
  'code': 'formatValidation',
  'label': 'Format validation',
  'labelPending': 'Validating format',
  'status': 'failure',
  'subSteps': [{
    'code': 'getTransactionId',
    'label': 'Getting transaction ID',
    'parentStep': 'formatValidation',
    'status': 'success',
    'subSteps': []
  }, {
    'code': 'computeLocalHash',
    'label': 'Computing local hash',
    'parentStep': 'formatValidation',
    'status': 'success',
    'subSteps': []
  }, {
    'code': 'fetchRemoteHash',
    'errorMessage': 'Could not confirm the transaction',
    'label': 'Fetching remote hash',
    'parentStep': 'formatValidation',
    'status': 'failure',
    'subSteps': []
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
    'label': 'Check Expires Date',
    'labelPending': 'Checking Expires Date',
    'parentStep': 'statusCheck'
  }]
}]
