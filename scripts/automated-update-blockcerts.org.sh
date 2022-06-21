#!/usr/bin/env bash

source ./automated-update-blockcerts-verifier-in-other-repo.sh

automated_update_bv_in_repo "blockchain-certificates-web" "blockchain-certificates-web.github.io" "feat/update-bv" "botcerts"
