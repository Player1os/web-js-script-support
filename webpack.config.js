// Load npm modules.
const fse = require('fs-extra')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// Load node modules.
const path = require('path')

// Expose the configuration object factory.
module.exports = (projectPath, env, rawEnv) => {
	return {
		entry: [
			// Include the project starting point into the bundle.
			path.join(projectPath, 'src', 'index.ts'),
		],
		output: {
			// Define the directory for the compilation output.
			path: path.join(projectPath, 'build'),
			// Define the name for the compilation output.
			filename: 'index.js',
		},
		module: {
			loaders: [
				// Specify a loader for all typescript source files that compiles them based on the given project's config.
				{
					test: /\.ts$/,
					exclude: /node_modules/,
					loader: 'awesome-typescript-loader',
					options: {
						useBabel: true,
					},
				},
			],
		},
		resolve: {
			// Specify that the alias in imports, that should be resolved to the project's root path.
			alias: {
				'...': projectPath,
			},
			// Specify that the typescript and javascript extensions can be ommitted from module names.
			extensions: [
				'.ts',
				'.js',
			],
		},
		plugins: [
			new BannerPlugin({
				banner: [
					// Define the constants to be statically compiled into the bundle.
					`var _env_ = JSON.parse(${JSON.stringify(env)});`,
					`var _raw_env_ = JSON.parse(${JSON.stringify(rawEnv)});`,
				].join('\n') + '\n',
				raw: true,
				entryOnly: false,
			}),
			// Use the bluebird implementation of Promise as a replacement for the standard implementation.
			new webpack.ProvidePlugin({
				Promise: 'bluebird',
			}),
			// Add the uglification of the result.
			new UglifyJsPlugin(),
		],
		// Specify that a sourcemap should be created for the outputted bundle.
		devtool: 'source-map',
	}
}
