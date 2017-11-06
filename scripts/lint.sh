#!/bin/bash
tslint './**/*.ts' -e './build/**/*' -e './dist/**/*' -e './node_modules/**/*' -p ./tsconfig.json \
&& echo OK
