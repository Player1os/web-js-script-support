#!/bin/bash
npm run clean \
&& npm run lint \
&& npm test \
&& npm run build
