#!/bin/bash

set -e

echo "🔐 Setting up SSH key for private submodule access..."

mkdir -p ~/.ssh

# Store the SSH private key from the environment variable
echo "$AMPLIFY_DEPLOY_KEY" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

# Ensure the known_hosts file is created for GitHub to prevent SSH warnings
ssh-keyscan github.com >> ~/.ssh/known_hosts

# Optionally, test SSH connection to GitHub
ssh -T git@github.com || true
