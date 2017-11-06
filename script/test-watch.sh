#!/bin/bash
chokidar 'src' 'package.json' 'tsconfig.json' -c 'npm test' --initial --silent
