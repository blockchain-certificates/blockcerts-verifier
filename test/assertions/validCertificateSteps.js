export default [
  {
    code: 'formatValidation',
    name: 'Format validation',
    status: 'success',
    substeps: [
      {'status': 'success', 'code': 'getTransactionId', 'name': 'Getting transaction ID'},
      {'status': 'success', 'code': 'computingLocalHash', 'name': 'Computing Local Hash'},
      {'status': 'success', 'code': 'fetchingRemoteHash', 'name': 'Fetching remote hash'},
      {'status': 'success', 'code': 'parsingIssuerKeys', 'name': 'Parsing issuer keys'}
    ]
  },
  {
    code: 'hashComparison',
    name: 'Hash comparison',
    status: 'success',
    substeps: [
      {'status': 'success', 'code': 'comparingHashes', 'name': 'Comparing Hashes'},
      {'status': 'success', 'code': 'checkingMerkleRoot', 'name': 'Checking Merkle Root'},
      {'status': 'success', 'code': 'checkingReceipt', 'name': 'Checking Receipt'}
    ]
  },
  {
    code: 'statusCheck',
    name: 'Status check',
    status: 'success',
    substeps: [
      {'status': 'success', 'code': 'checkingRevokedStatus', 'name': 'Checking Revoked Status'},
      {'status': 'success', 'code': 'checkingAuthenticity', 'name': 'Checking Authenticity'},
      {'status': 'success', 'code': 'checkingExpiresDate', 'name': 'Checking Expires Date'}
    ]
  },
  {'status': 'success', 'code': 'final', 'name': 'Verified', substeps: []}
];
