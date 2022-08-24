export default [
  {
    "code": "proofVerification",
    "label": "Proof Verification",
    "labelPending": "Verifying Proof",
    "subSteps": [],
    "suites": [
      {
        "proofType": "MerkleProof2017",
        "subSteps": [
          {
            "code": "getTransactionId",
            "label": "Get transaction ID",
            "labelPending": "Getting transaction ID",
            "parentStep": "proofVerification",
            "status": "standby"
          },
          {
            "code": "computeLocalHash",
            "label": "Compute local hash",
            "labelPending": "Computing local hash",
            "parentStep": "proofVerification",
            "status": "standby"
          },
          {
            "code": "fetchRemoteHash",
            "label": "Fetch remote hash",
            "labelPending": "Fetching remote hash",
            "parentStep": "proofVerification",
            "status": "standby"
          },
          {
            "code": "compareHashes",
            "label": "Compare hashes",
            "labelPending": "Comparing hashes",
            "parentStep": "proofVerification",
            "status": "standby"
          },
          {
            "code": "checkMerkleRoot",
            "label": "Check Merkle Root",
            "labelPending": "Checking Merkle Root",
            "parentStep": "proofVerification",
            "status": "standby"
          },
          {
            "code": "checkReceipt",
            "label": "Check Receipt",
            "labelPending": "Checking Receipt",
            "parentStep": "proofVerification",
            "status": "standby"
          },
          {
            "code": "parseIssuerKeys",
            "label": "Parse issuer keys",
            "labelPending": "Parsing issuer keys",
            "parentStep": "proofVerification",
            "status": "standby"
          },
          {
            "code": "checkAuthenticity",
            "label": "Check Authenticity",
            "labelPending": "Checking Authenticity",
            "parentStep": "proofVerification",
            "status": "standby"
          }
        ]
      }
    ],
    "isLast": false,
    "status": "standby"
  },
  {
    "code": "statusCheck",
    "label": "Status check",
    "labelPending": "Checking record status",
    "subSteps": [
      {
        "code": "checkRevokedStatus",
        "label": "Check Revoked Status",
        "labelPending": "Checking Revoked Status",
        "parentStep": "statusCheck",
        "status": "standby"
      },
      {
        "code": "checkExpiresDate",
        "label": "Check Expiration Date",
        "labelPending": "Checking Expiration Date",
        "parentStep": "statusCheck",
        "status": "standby"
      }
    ],
    "isLast": true,
    "status": "starting"
  }
];
