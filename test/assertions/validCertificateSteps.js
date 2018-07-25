export default [
  {
    'code': 'formatValidation',
    'name': 'Format validation',
    'status': 'success',
    'substeps': [{
      'code': 'getTransactionId',
      'name': 'Getting transaction ID',
      'parentStep': 'formatValidation',
      'status': 'success',
      'substeps': []
    }, {
      'code': 'computeLocalHash',
      'name': 'Computing local hash',
      'parentStep': 'formatValidation',
      'status': 'success',
      'substeps': []
    }, {
      'code': 'fetchRemoteHash',
      'name': 'Fetching remote hash',
      'parentStep': 'formatValidation',
      'status': 'success',
      'substeps': []
    }, {
      'code': 'parseIssuerKeys',
      'name': 'Parsing issuer keys',
      'parentStep': 'formatValidation',
      'status': 'success',
      'substeps': []
    }]
  },
  {
    'code': 'hashComparison',
    'name': 'Hash comparison',
    'status': 'success',
    'substeps': [{
      'code': 'compareHashes',
      'name': 'Comparing hashes',
      'parentStep': 'hashComparison',
      'status': 'success',
      'substeps': []
    }, {
      'code': 'checkMerkleRoot',
      'name': 'Checking Merkle Root',
      'parentStep': 'hashComparison',
      'status': 'success',
      'substeps': []
    }, {
      'code': 'checkReceipt',
      'name': 'Checking Receipt',
      'parentStep': 'hashComparison',
      'status': 'success',
      'substeps': []
    }]
  },
  {
    'code': 'statusCheck',
    'name': 'Status check',
    'status': 'success',
    'substeps': [{
      'code': 'checkRevokedStatus',
      'name': 'Checking Revoked Status',
      'parentStep': 'statusCheck',
      'status': 'success',
      'substeps': []
    }, {
      'code': 'checkAuthenticity',
      'name': 'Checking Authenticity',
      'parentStep': 'statusCheck',
      'status': 'success',
      'substeps': []
    }, {
      'code': 'checkExpiresDate',
      'name': 'Checking Expires Date',
      'parentStep': 'statusCheck',
      'status': 'success',
      'substeps': []
    }]
  }
];
