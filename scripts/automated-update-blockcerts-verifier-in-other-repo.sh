#!/usr/bin/env bash

automated_update_bv_in_repo () {
  # Parameters in order: $GITHUB_ORG, $GITHUB_REPO, $WORK_BRANCH, $GITHUB_USER
  GITHUB_ORG=$1
  GITHUB_REPO=$2
  WORK_BRANCH=$3
  GITHUB_USER=$4

  # Local Parameters
  GITHUB_COM=github.com
  GITHUB_REPO_PATH=$GITHUB_COM/$GITHUB_ORG/$GITHUB_REPO

  # clone repo
  git clone https://"$GITHUB_REPO_PATH".git
  cd "$GITHUB_REPO" || exit

  # rename remote to add authentication
  git remote rm origin
  git remote add origin https://"$GITHUB_USER":"$BOTCERTS_PR_GITHUB_TOKEN"@"$GITHUB_REPO_PATH".git

  # run script from client repo
  . scripts/update_blockcerts_verifier.sh

  curl --data '{"head":"'"${WORK_BRANCH}"'", "base":"master", "title": "bump Blockcerts Verifier version", "body": "Please review and merge @lemoustachiste @raiseandfall"}' -H "Authorization: token ${BOTCERTS_PR_GITHUB_TOKEN}" https://api.github.com/repos/"$GITHUB_ORG"/"$GITHUB_REPO"/pulls -v

  # clean after use
  cd ..
  echo 'Delete working directory'
  rm -rf "$GITHUB_REPO"
}
