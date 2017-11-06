#!/bin/bash
chokidar 'package.json' 'tsconfig.json' 'tslint.json' '**/*.ts' -i 'dist' -i 'build' -i 'node_modules' \
-c 'npm run lint' --initial --silent
