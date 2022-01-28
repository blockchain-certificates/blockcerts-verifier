#!/usr/bin/env bash

# automate PR process to Blockcerts.org: update blockcerts-verifier dependency
GITHUB_COM=github.com
BLOCKCERTS_GITHUB_REPO=blockchain-certificates/blockchain-certificates.github.io
GIT_REPO=$GITHUB_COM/$BLOCKCERTS_GITHUB_REPO.git
WORK_BRANCH=chore/update-bv
GITHUB_USER=botcerts

# clone CTS repo
git clone https://$GIT_REPO
cd blockchain-certificates.github.io

# rename remote to add authentication
git remote rm origin
git remote add origin https://$GITHUB_USER:$BOTCERTS_PR_GITHUB_TOKEN@$GIT_REPO

# checkout new branch
git checkout -b $WORK_BRANCH

# update blockcerts-verifier
npm install
npm i @blockcerts/blockcerts-verifier

# clean unwanted files. Note: we could also handle that with .gitignore
echo 'Clean unwanted files'
pwd
git clean -df

# commit
git status
git add .
git commit -m "chore(BUV): update to latest version"

# push
git push origin $WORK_BRANCH

# open PR
#{
#  "title": "Amazing new feature",
#  "body": "Please pull this in!",
#  "head": "octocat:new-feature",
#  "base": "master"
#}

curl --data '{"head":"'${WORK_BRANCH}'", "base":"master", "title": "bump Blockcerts Verifier version", "body": "Please review and merge @lemoustachiste @raiseandfall"}' -H "Authorization: token ${BOTCERTS_PR_GITHUB_TOKEN}" https://api.github.com/repos/$BLOCKCERTS_GITHUB_REPO/pulls -v

# clean after use
cd ..
echo 'Delete working directory'
rm -rf blockchain-certificates.github.io
