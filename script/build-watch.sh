#!/bin/bash
chokidar 'src' 'package.json' 'tsconfig.json' 'webpack.config.ts' \
-i '**/*.spec.ts' -c 'npm run build' --initial --silent
