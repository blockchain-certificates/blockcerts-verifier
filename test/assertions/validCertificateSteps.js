export default [{
  'code': 'formatValidation',
  'label': 'Format validation',
  'labelPending': 'Validating format',
  'status': 'success',
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
    'code': 'parseIssuerKeys',
    'label': 'Parsing issuer keys',
    'parentStep': 'formatValidation',
    'status': 'success'
  }]
}, {
  'code': 'hashComparison',
  'label': 'Hash comparison',
  'labelPending': 'Comparing hash',
  'status': 'success',
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
  }, {
    'code': 'checkReceipt',
    'label': 'Checking Receipt',
    'parentStep': 'hashComparison',
    'status': 'success'
  }]
}, {
  'code': 'statusCheck',
  'label': 'Status check',
  'labelPending': 'Checking record status',
  'status': 'success',
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
  }, {
    'code': 'checkExpiresDate',
    'label': 'Checking Expires Date',
    'parentStep': 'statusCheck',
    'status': 'success'
  }]
}];
