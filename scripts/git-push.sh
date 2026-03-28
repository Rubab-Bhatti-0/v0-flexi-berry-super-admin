#!/bin/bash

cd /vercel/share/v0-project

# Configure git if not already configured
git config user.email "v0@vercel.com" 2>/dev/null || true
git config user.name "v0 Bot" 2>/dev/null || true

# Add all changes
git add .

# Commit with message
git commit -m "fix: resolve CSS and build errors - fix leading-tight class and complete component structure" || echo "Nothing to commit"

# Push to the current branch
git push origin HEAD:v0/rubabbhatti310504-6504-40469324

echo "✅ Code pushed to GitHub successfully"
