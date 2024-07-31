#!/bin/bash

# Get the current branch name
currentBranch=$(git rev-parse --abbrev-ref HEAD)

# Check if the current branch is the main branch
if [ "$currentBranch" = "main" ]; then
  echo "ERROR: Commit rejected by Lefthook pre-commit hook!"
  echo "You are about to commit to the \"$currentBranch\" branch!"
  echo "Please create a new branch and commit there."
  echo "Only pull requests can be merged into the \"$currentBranch\" branch."
  exit 1
fi
