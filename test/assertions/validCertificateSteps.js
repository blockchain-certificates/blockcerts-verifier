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
            "status": "success"
          },
          {
            "code": "computeLocalHash",
            "label": "Compute local hash",
            "labelPending": "Computing local hash",
            "parentStep": "proofVerification",
            "status": "success"
          },
          {
            "code": "fetchRemoteHash",
            "label": "Fetch remote hash",
            "labelPending": "Fetching remote hash",
            "parentStep": "proofVerification",
            "status": "success"
          },
          {
            "code": "compareHashes",
            "label": "Compare hashes",
            "labelPending": "Comparing hashes",
            "parentStep": "proofVerification",
            "status": "success"
          },
          {
            "code": "checkMerkleRoot",
            "label": "Check Merkle Root",
            "labelPending": "Checking Merkle Root",
            "parentStep": "proofVerification",
            "status": "success"
          },
          {
            "code": "checkReceipt",
            "label": "Check Receipt",
            "labelPending": "Checking Receipt",
            "parentStep": "proofVerification",
            "status": "success"
          },
          {
            "code": "parseIssuerKeys",
            "label": "Parse issuer keys",
            "labelPending": "Parsing issuer keys",
            "parentStep": "proofVerification",
            "status": "success"
          },
          {
            "code": "checkAuthenticity",
            "label": "Check Authenticity",
            "labelPending": "Checking Authenticity",
            "parentStep": "proofVerification",
            "status": "success"
          }
        ]
      }
    ],
    "isLast": false,
    "status": "success"
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
        "status": "success"
      },
      {
        "code": "checkExpiresDate",
        "label": "Check Expiration Date",
        "labelPending": "Checking Expiration Date",
        "parentStep": "statusCheck",
        "status": "success"
      }
    ],
    "isLast": true,
    "status": "success"
  }
];
