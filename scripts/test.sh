#!/bin/bash
nyc mocha -r ts-node/register -r @player1os/node-js-application-support/register 'src/**/*.spec.ts'
