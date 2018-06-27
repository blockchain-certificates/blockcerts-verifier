export default [
  {
    code: 'formatValidation',
    label: 'Format validation',
    labelProcess: 'Validating format',
    substeps: [
      {'status': 'starting', 'stepCode': 'getTransactionId', 'stepName': 'Getting transaction ID'},
      {'status': 'success', 'stepCode': 'getTransactionId', 'stepName': 'Getting transaction ID'},
      {'status': 'starting', 'stepCode': 'computingLocalHash', 'stepName': 'Computing Local Hash'},
      {'status': 'success', 'stepCode': 'computingLocalHash', 'stepName': 'Computing Local Hash'},
      {'status': 'starting', 'stepCode': 'fetchingRemoteHash', 'stepName': 'Fetching remote hash'},
      {'status': 'success', 'stepCode': 'fetchingRemoteHash', 'stepName': 'Fetching remote hash'},
      {'status': 'starting', 'stepCode': 'parsingIssuerKeys', 'stepName': 'Parsing issuer keys'},
      {'status': 'success', 'stepCode': 'parsingIssuerKeys', 'stepName': 'Parsing issuer keys'},
    ]
  },
  {
    code: 'hashComparison',
    label: 'Hash comparison',
    labelProcess: 'Comparing hash',
    substeps: [
      {'status': 'starting', 'stepCode': 'comparingHashes', 'stepName': 'Comparing Hashes'},
      {'status': 'success', 'stepCode': 'comparingHashes', 'stepName': 'Comparing Hashes'},
      {'status': 'starting', 'stepCode': 'checkingMerkleRoot', 'stepName': 'Checking Merkle Root'},
      {'status': 'success', 'stepCode': 'checkingMerkleRoot', 'stepName': 'Checking Merkle Root'},
      {'status': 'starting', 'stepCode': 'checkingReceipt', 'stepName': 'Checking Receipt'},
      {'status': 'success', 'stepCode': 'checkingReceipt', 'stepName': 'Checking Receipt'},
    ]
  },
  {
    code: 'statusCheck',
    label: 'Status check',
    labelProcess: 'Checking record status',
    substeps: [
      {'status': 'starting', 'stepCode': 'checkingRevokedStatus', 'stepName': 'Checking Revoked Status'},
      {'status': 'success', 'stepCode': 'checkingRevokedStatus', 'stepName': 'Checking Revoked Status'},
      {'status': 'starting', 'stepCode': 'checkingAuthenticity', 'stepName': 'Checking Authenticity'},
      {'status': 'success', 'stepCode': 'checkingAuthenticity', 'stepName': 'Checking Authenticity'},
      {'status': 'starting', 'stepCode': 'checkingExpiresDate', 'stepName': 'Checking Expires Date'},
      {'status': 'success', 'stepCode': 'checkingExpiresDate', 'stepName': 'Checking Expires Date'},
    ]
  },
  {'status': 'success', 'stepCode': 'final', 'stepName': ''}
];
