// Load app modules.
import nodeWebpackConfig from '.../src/node'

// Load npm modules.
import * as webpack from 'webpack'

// Load node modules.
import * as path from 'path'

// Expose the configuration object.
export default (mainDirPath: string) => {
	return {
		// Load the common node configuration.
		...nodeWebpackConfig(mainDirPath),
		entry: [
			// Include the project starting point into the bundle.
			path.join(mainDirPath, 'src', 'index.ts'),
		],
		output: {
			// Define the directory for the compilation output.
			path: path.join(mainDirPath, 'build'),
			// Define the name for the compilation output.
			filename: 'index.js',
		},
		plugins: [
			// Include a module to enable support for source maps within the node executable.
			new webpack.BannerPlugin({
				banner: "require('source-map-support').install();",
				raw: true,
				entryOnly: false,
			}),
			// Use the bluebird implementation of Promise as a replacement for the standard implementation.
			new webpack.ProvidePlugin({
				Promise: 'bluebird',
			}),
		],
	}
}
