// Load npm modules.
import * as UglifyJSPlugin from 'uglifyjs-webpack-plugin'
import { DefinePlugin } from 'webpack'

// Load node modules.
import * as fs from 'fs'
import * as path from 'path'

// Expose the configuration object.
export default (mainDirPath: string, isTypesIncluded = false) => {
	// Load the package file.
	const packageJson = JSON.parse(fs.readFileSync(path.join(mainDirPath, 'package.json'), 'utf-8'))

	return {
		module: {
			// Specify a loader for all typescript source files that first compiles typescript into es2017 standards javascript
			// using the typescript compiler and then compiles that to javascript supported by the babel compiler.
			loaders: [{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'awesome-typescript-loader',
				options: {
					...(isTypesIncluded
						? {
							declaration: true,
							declarationDir: 'types',
						}
						: {}),
					compilerOptions: {
						target: 'es2017',
					},
					useBabel: true,
					babelOptions: {
						presets: [
							['env', {
								targets: {
									browsers: [
										'last 10 versions',
										'ie >= 8',
									],
								},
							}],
						],
					},
				},
			}],
		},
		resolve: {
			// Specify that the '#' character in imports should be resolved to the project's root path.
			alias: {
				'...': mainDirPath,
			},
			// Specify that the typescript and javascript extensions can be ommitted from module names.
			extensions: [
				'.ts',
				'.js',
			],
		},
		plugins: [
			new UglifyJSPlugin(),
			new DefinePlugin({
				_config_: JSON.stringify(config),
				_package_: JSON.stringify(packageJson)
			}),
		],
		// Specify that a sourcemap should be created for the outputted bundle.
		devtool: 'source-map',
	}
}
