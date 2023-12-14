#!/usr/bin/env bash

# automate PR process to Blockcerts.org: update blockcerts-verifier dependency
GITHUB_COM=github.com
BLOCKCERTS_GITHUB_REPO=blockchain-certificates-web/blockchain-certificates-web.github.io
GIT_REPO=$GITHUB_COM/$BLOCKCERTS_GITHUB_REPO.git
WORK_BRANCH=feat/update-bv
GITHUB_USER=botcerts

# clone CTS repo
git clone https://$GIT_REPO
cd blockchain-certificates-web.github.io

# rename remote to add authentication
git remote rm origin
git remote add origin https://$GITHUB_USER:$BOTCERTS_PR_GITHUB_TOKEN@$GIT_REPO

# run script from client repo
. scripts/update_blockcerts_verifier.sh

# open PR
#{
#  "title": "Amazing new feature",
#  "body": "Please pull this in!",
#  "head": "octocat:new-feature",
#  "base": "master"
#}

curl -L \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${BOTCERTS_PR_GITHUB_TOKEN}" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/$BLOCKCERTS_GITHUB_REPO/pulls \
  -d '{"head":"'${WORK_BRANCH}'", "base":"master", "title": "bump Blockcerts Verifier version", "body": "Please review and merge @lemoustachiste @raiseandfall"}'

# clean after use
cd ..
echo 'Delete working directory'
rm -rf blockchain-certificates.github.io
