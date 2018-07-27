export default [{
  'code': 'formatValidation',
  'label': 'Format validation',
  'labelPending': 'Validating format',
  'status': 'success',
  'subSteps': [{
    'code': 'getTransactionId',
    'name': 'Getting transaction ID',
    'parentStep': 'formatValidation',
    'status': 'success',
    'subSteps': []
  }, {
    'code': 'computeLocalHash',
    'name': 'Computing local hash',
    'parentStep': 'formatValidation',
    'status': 'success',
    'subSteps': []
  }, {
    'code': 'fetchRemoteHash',
    'name': 'Fetching remote hash',
    'parentStep': 'formatValidation',
    'status': 'success',
    'subSteps': []
  }, {
    'code': 'parseIssuerKeys',
    'name': 'Parsing issuer keys',
    'parentStep': 'formatValidation',
    'status': 'success',
    'subSteps': []
  }]
}, {
  'code': 'hashComparison',
  'label': 'Hash comparison',
  'labelPending': 'Comparing hash',
  'status': 'success',
  'subSteps': [{
    'code': 'compareHashes',
    'name': 'Comparing hashes',
    'parentStep': 'hashComparison',
    'status': 'success',
    'subSteps': []
  }, {
    'code': 'checkMerkleRoot',
    'name': 'Checking Merkle Root',
    'parentStep': 'hashComparison',
    'status': 'success',
    'subSteps': []
  }, {
    'code': 'checkReceipt',
    'name': 'Checking Receipt',
    'parentStep': 'hashComparison',
    'status': 'success',
    'subSteps': []
  }]
}, {
  'code': 'statusCheck',
  'label': 'Status check',
  'labelPending': 'Checking record status',
  'status': 'success',
  'subSteps': [{
    'code': 'checkRevokedStatus',
    'name': 'Checking Revoked Status',
    'parentStep': 'statusCheck',
    'status': 'success',
    'subSteps': []
  }, {
    'code': 'checkAuthenticity',
    'name': 'Checking Authenticity',
    'parentStep': 'statusCheck',
    'status': 'success',
    'subSteps': []
  }, {
    'code': 'checkExpiresDate',
    'name': 'Checking Expires Date',
    'parentStep': 'statusCheck',
    'status': 'success',
    'subSteps': []
  }]
}]
