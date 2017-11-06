#!/bin/bash
git checkout . \
&& git checkout master \
&& git pull \
&& npm run validate
