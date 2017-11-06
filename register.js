// Add support for source-maps.
require('source-map-support/register')

// Load and setup the env variables.
require('@player1os/dotenv').default(__dirname)

// Load bluebird as the global promise library.
global.Promise = require('bluebird')

// Setup the module path alias.
require('@player1os/module-path-alias')('...')
