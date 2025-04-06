#!/bin/bash

# Exit on error
set -e

echo "🔐 Setting up SSH key for private submodule access..."

mkdir -p ~/.ssh
echo "$AMPLIFY_DEPLOY_KEY" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
ssh-keyscan github.com >> ~/.ssh/known_hosts

# Optional: Test SSH access
ssh -T git@github.com || true
