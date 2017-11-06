#!/bin/bash

# Update
git pull \
&& npm prune \
&& npm install

# Build
npm run build \
&& mkdir -p dist \

# Backup
if [ -d dist/current ]; then
	mv dist/current dist/$(date -u +%Y%m%d_%H%M%S_%N);
fi

# Swap
mv build dist/current
