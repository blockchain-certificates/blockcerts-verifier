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
      'code': 'computingLocalHash',
      'name': 'Computing Local Hash',
      'parentStep': 'formatValidation',
      'status': 'success',
      'substeps': []
    }, {
      'code': 'fetchingRemoteHash',
      'name': 'Fetching remote hash',
      'parentStep': 'formatValidation',
      'status': 'success',
      'substeps': []
    }, {
      'code': 'parsingIssuerKeys',
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
      'code': 'comparingHashes',
      'name': 'Comparing Hashes',
      'parentStep': 'hashComparison',
      'status': 'success',
      'substeps': []
    }, {
      'code': 'checkingMerkleRoot',
      'name': 'Checking Merkle Root',
      'parentStep': 'hashComparison',
      'status': 'success',
      'substeps': []
    }, {
      'code': 'checkingReceipt',
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
      'code': 'checkingRevokedStatus',
      'name': 'Checking Revoked Status',
      'parentStep': 'statusCheck',
      'status': 'success',
      'substeps': []
    }, {
      'code': 'checkingAuthenticity',
      'name': 'Checking Authenticity',
      'parentStep': 'statusCheck',
      'status': 'success',
      'substeps': []
    }, {
      'code': 'checkingExpiresDate',
      'name': 'Checking Expires Date',
      'parentStep': 'statusCheck',
      'status': 'success',
      'substeps': []
    }]
  },
  {'code': 'final', 'name': 'Verified', 'status': 'success', 'substeps': []}
];
