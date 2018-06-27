export default [
  {
    code: 'formatValidation',
    name: 'Format validation',
    status: 'standby',
    substeps: [
      {'status': 'starting', 'code': 'getTransactionId', 'name': 'Getting transaction ID'},
      {'status': 'success', 'code': 'getTransactionId', 'name': 'Getting transaction ID'},
      {'status': 'starting', 'code': 'computingLocalHash', 'name': 'Computing Local Hash'},
      {'status': 'success', 'code': 'computingLocalHash', 'name': 'Computing Local Hash'},
      {'status': 'starting', 'code': 'fetchingRemoteHash', 'name': 'Fetching remote hash'},
      {'status': 'success', 'code': 'fetchingRemoteHash', 'name': 'Fetching remote hash'},
      {'status': 'starting', 'code': 'parsingIssuerKeys', 'name': 'Parsing issuer keys'},
      {'status': 'success', 'code': 'parsingIssuerKeys', 'name': 'Parsing issuer keys'},
    ]
  },
  {
    code: 'hashComparison',
    name: 'Hash comparison',
    status: 'standby',
    substeps: [
      {'status': 'starting', 'code': 'comparingHashes', 'name': 'Comparing Hashes'},
      {'status': 'success', 'code': 'comparingHashes', 'name': 'Comparing Hashes'},
      {'status': 'starting', 'code': 'checkingMerkleRoot', 'name': 'Checking Merkle Root'},
      {'status': 'success', 'code': 'checkingMerkleRoot', 'name': 'Checking Merkle Root'},
      {'status': 'starting', 'code': 'checkingReceipt', 'name': 'Checking Receipt'},
      {'status': 'success', 'code': 'checkingReceipt', 'name': 'Checking Receipt'},
    ]
  },
  {
    code: 'statusCheck',
    name: 'Status check',
    status: 'standby',
    substeps: [
      {'status': 'starting', 'code': 'checkingRevokedStatus', 'name': 'Checking Revoked Status'},
      {'status': 'success', 'code': 'checkingRevokedStatus', 'name': 'Checking Revoked Status'},
      {'status': 'starting', 'code': 'checkingAuthenticity', 'name': 'Checking Authenticity'},
      {'status': 'success', 'code': 'checkingAuthenticity', 'name': 'Checking Authenticity'},
      {'status': 'starting', 'code': 'checkingExpiresDate', 'name': 'Checking Expires Date'},
      {'status': 'success', 'code': 'checkingExpiresDate', 'name': 'Checking Expires Date'},
    ]
  },
  {'status': 'success', 'code': 'final', 'name': '', substeps: []}
];
