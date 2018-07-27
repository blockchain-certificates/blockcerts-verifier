export default [
  {
    'code': 'formatValidation',
    'name': 'Format validation',
    'status': 'failure',
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
      'errorMessage': 'Could not confirm the transaction',
      'name': 'Fetching remote hash',
      'parentStep': 'formatValidation',
      'status': 'failure',
      'subSteps': []
    }]
  },
  {'code': 'hashComparison', 'name': 'Hash comparison', 'status': 'standby', 'subSteps': []}, {
    'code': 'statusCheck',
    'name': 'Status check',
    'status': 'standby',
    'subSteps': []
  }
];
