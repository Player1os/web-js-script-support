import 'module-alias/register'

// Load app modules.
import nodeLibraryConfig from '.../src/node/library'

// Expose the configuration object.
export default nodeLibraryConfig(__dirname)
