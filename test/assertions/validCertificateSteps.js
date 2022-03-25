export default [{
  'code': 'formatValidation',
  'label': 'Format validation',
  'labelPending': 'Validating format',
  'status': 'success',
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
    'label': 'Fetching remote hash',
    'parentStep': 'formatValidation',
    'status': 'success'
  }, {
    'code': 'getIssuerProfile',
    'label': 'Getting issuer profile',
    'parentStep': 'formatValidation',
    'status': 'success'
  }, {
    'code': 'parseIssuerKeys',
    'label': 'Parsing issuer keys',
    'parentStep': 'formatValidation',
    'status': 'success'
  }, {
    'code': 'checkImagesIntegrity',
    'label': 'Verifying Images Integrity',
    'parentStep': 'formatValidation',
    'status': 'success'
  }]
}, {
  'code': 'hashComparison',
  'label': 'Hash comparison',
  'labelPending': 'Comparing hash',
  'status': 'success',
  'isLast': false,
  'subSteps': [{
    'code': 'compareHashes',
    'label': 'Comparing hashes',
    'parentStep': 'hashComparison',
    'status': 'success'
  }, {
    'code': 'checkMerkleRoot',
    'label': 'Checking Merkle Root',
    'parentStep': 'hashComparison',
    'status': 'success'
  }, {'code': 'checkReceipt', 'label': 'Checking Receipt', 'parentStep': 'hashComparison', 'status': 'success'}]
}, {
  'code': 'statusCheck',
  'label': 'Status check',
  'labelPending': 'Checking record status',
  'status': 'success',
  'isLast': true,
  'subSteps': [{
    'code': 'checkRevokedStatus',
    'label': 'Checking Revoked Status',
    'parentStep': 'statusCheck',
    'status': 'success'
  }, {
    'code': 'checkAuthenticity',
    'label': 'Checking Authenticity',
    'parentStep': 'statusCheck',
    'status': 'success'
  }, {'code': 'checkExpiresDate', 'label': 'Checking Expiration Date', 'parentStep': 'statusCheck', 'status': 'success'}]
}];
